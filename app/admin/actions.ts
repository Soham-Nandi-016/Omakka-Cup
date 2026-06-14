"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export interface AdminStudent {
  id: number;
  name: string;
  dob: string;
  age: number;
  weight: number;
  belt: string;
  gender: string;
  instructorName: string;
  state: string;
  phone: string;
  email: string;
  style: string;
  kata: boolean;
  kumite: boolean;
  createdAt: string;
}

// ---------------------------------------------------------------------------
// Admin password verification
// ---------------------------------------------------------------------------
// Reads the plain passphrase from the environment (set in .env.local) and
// produces a bcrypt hash ONCE at module-load time using a fresh salt.
// This sidesteps the entire "did the pre-computed hash match?" problem —
// bcrypt.hashSync + bcrypt.compare are always internally consistent.
//
// bcrypt.hashSync is intentionally synchronous here: it runs once at cold
// start, not per request, so the event-loop block is acceptable (~80 ms).
const _adminPassphrase =
  process.env.ADMIN_PASSWORD ?? "OssOkinawaCup2026!";

const ADMIN_PASSWORD_HASH = bcrypt.hashSync(_adminPassphrase, 10);

export async function verifyAdminPassword(password: string): Promise<boolean> {
  // timing-safe comparison — never use plain ===
  return await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
}

export async function getRegistrations(): Promise<AdminStudent[]> {
  const students = await prisma.student.findMany({
    orderBy: { createdAt: "desc" },
  });

  return students.map((s) => ({
    id:            s.id,
    name:          s.name,
    dob:           s.dob.toISOString().split("T")[0],
    age:           s.age,
    weight:        s.weight,
    belt:          s.belt,
    gender:        s.gender,
    instructorName: s.instructorName,
    state:         s.state,
    phone:         s.phone,
    email:         s.email,
    style:         s.style,
    kata:          s.kata,
    kumite:        s.kumite,
    createdAt:     s.createdAt.toISOString(),
  }));
}
