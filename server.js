// Load .env / .env.local FIRST before anything else touches process.env
require('dotenv').config({ path: '.env' });
require('dotenv').config({ path: '.env.local' }); // .env.local overrides .env

const express  = require('express');
const cors     = require('cors');
const bcrypt   = require('bcryptjs');
const { z }    = require("zod");

// ---------------------------------------------------------------------------
// Admin authentication
// ---------------------------------------------------------------------------
// Reads the plain passphrase from the environment and hashes it once at
// startup. bcrypt.hashSync + bcrypt.compare are always internally consistent,
// so no externally pre-computed hash string is ever needed here.
const _adminPassphrase =
  process.env.ADMIN_PASSWORD || 'OssOkinawaCup2026!';

const ADMIN_PASSWORD_HASH = bcrypt.hashSync(_adminPassphrase, 10);

// Simple secret for JWT signing — keep this in your .env for production.
const JWT_SECRET = process.env.JWT_SECRET || 'omakka_jwt_secret_change_in_prod';
const JWT_EXPIRES_IN = '8h'; // session lifetime

// Require jsonwebtoken only if present; graceful degradation if not installed.
let jwt;
try { jwt = require('jsonwebtoken'); } catch { jwt = null; }

/** Express middleware: verifies Bearer JWT on protected routes */
function verifyToken(req, res, next) {
  if (!jwt) return res.status(501).json({ success: false, message: 'JWT module not available.' });
  const authHeader = req.headers['authorization'] || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
  if (!token) return res.status(401).json({ success: false, message: 'Authentication required.' });
  try {
    req.admin = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(403).json({ success: false, message: 'Invalid or expired session token.' });
  }
}

// Prisma 7 requires a driver adapter — datasources/url in constructor is removed
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');
const { PrismaClient } = require('@prisma/client');

const DB_URL = process.env.DATABASE_URL || "mysql://root:nunna123@localhost:3306/omakka_cup";

// Parse connection string into config object for the adapter
const dbUrl = new URL(DB_URL);
const adapter = new PrismaMariaDb({
  host: dbUrl.hostname,
  port: parseInt(dbUrl.port) || 3306,
  user: dbUrl.username,
  password: decodeURIComponent(dbUrl.password),
  database: dbUrl.pathname.slice(1),
  connectionLimit: 5,
});

const prisma = new PrismaClient({ adapter });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const RegistrationSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  address: z.string().min(10, "Please enter a complete address"),
  phone: z.string().regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  email: z.string().email("Enter a valid email address"),
  gender: z.enum(["MALE", "FEMALE"], { errorMap: () => ({ message: "Please select gender" }) }),
  dob: z.string().min(1, "Date of birth is required"),
  state: z.string().min(1, "Please select your state"),
  belt: z.enum(["WHITE", "YELLOW", "ORANGE", "GREEN", "BLUE", "PURPLE", "BROWN", "BLACK"], {
    errorMap: () => ({ message: "Please select belt/rank" }),
  }),
  style: z.string().min(1, "Please select your karate style"),
  instructorName: z.string().min(2, "Instructor name is required"),
  weight: z.string().min(1, "Weight is required"),
  declarationAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the declaration" }),
  }).or(z.literal("true")), // Handle boolean or string
});

app.post("/api/register", async (req, res) => {
  try {
    const raw = req.body;

    const parsed = RegistrationSchema.safeParse(raw);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Please fix the errors below.",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    const data = parsed.data;
    const dobDate = new Date(data.dob);
    const today = new Date();
    let age = today.getFullYear() - dobDate.getFullYear();
    const m = today.getMonth() - dobDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) age--;

    const weightNum = parseFloat(data.weight);
    if (isNaN(weightNum) || weightNum < 10 || weightNum > 200) {
      return res.status(400).json({ success: false, message: "Please enter a valid weight between 10 and 200 kg." });
    }

    // If the request body carries a plain-text password field (e.g. for future
    // user-account support), hash it with bcrypt before any database write.
    // Students in the current schema have no password field, so hashedPassword
    // is computed but not yet persisted — ready for when the schema adds it.
    const hashedPassword = req.body.password
      ? await bcrypt.hash(req.body.password, 10)
      : null;

    await prisma.student.create({
      data: {
        name: data.name.trim(),
        address: data.address.trim(),
        phone: data.phone,
        email: data.email.toLowerCase().trim(),
        gender: data.gender,
        dob: dobDate,
        age,
        state: data.state,
        belt: data.belt,
        style: data.style,
        instructorName: data.instructorName.trim(),
        weight: weightNum,
        kata: true,
        kumite: true,
        declarationAccepted: true,
        // Uncomment the line below once the 'password' column is added to the schema:
        // ...(hashedPassword && { password: hashedPassword }),
      },
    });

    return res.status(200).json({
      success: true,
      message: `Registration successful! Welcome, ${data.name.trim()}. You are now registered for OMAKKA Cup 2026.`,
    });
  } catch (err) {
    console.error("[Registration Error]", err);
    return res.status(500).json({
      success: false,
      message: "A database error occurred. Please try again or contact the organizers.",
    });
  }
});

// ---------------------------------------------------------------------------
// POST /api/admin/login
// Body: { password: string }
// Verifies the supplied password against the pre-hashed admin passphrase using
// bcrypt.compare (timing-safe) and returns a JWT session token on success.
// ---------------------------------------------------------------------------
app.post('/api/admin/login', async (req, res) => {
  try {
    const { password } = req.body || {};
    if (!password || typeof password !== 'string') {
      return res.status(400).json({ success: false, message: 'Password is required.' });
    }

    // bcrypt.compare is timing-safe — never use plain === comparison
    const match = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
    if (!match) {
      return res.status(401).json({ success: false, message: 'Incorrect password.' });
    }

    // Issue JWT if jsonwebtoken is available
    if (jwt) {
      const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
      return res.status(200).json({ success: true, token });
    }

    // Fallback: no JWT module — just confirm authentication
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('[Admin Login Error]', err);
    return res.status(500).json({ success: false, message: 'Server error during authentication.' });
  }
});

// ---------------------------------------------------------------------------
// Helper: hash a plain-text password before storing it in the database.
// Usage: const hashed = await hashPassword(plainText);
// ---------------------------------------------------------------------------
async function hashPassword(plainText) {
  return bcrypt.hash(plainText, 10);
}

app.listen(PORT, () => {
  console.log(`Express standalone server is running on port ${PORT}`);
});
