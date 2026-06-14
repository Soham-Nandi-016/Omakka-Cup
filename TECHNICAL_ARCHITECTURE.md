# OMAKKA Cup 2026 – Technical Architecture & Review Report

## 1. EXECUTIVE SUMMARY & PROJECT SCOPE

The **OMAKKA Cup 2026 Season 3 Portal** is a specialized, high-performance Tournament Management Platform designed for the All India Open Karate Championship. The application's primary purpose is to facilitate seamless, multi-participant registrations while providing organizers with a secure, real-time administrative command center for roster management. 

From an engineering perspective, the project exhibits a high degree of production readiness. It leverages modern web standards, strict type safety, and an independent backend service to handle high-concurrency database writes safely. The system is structurally prepared for immediate transition into a live cloud environment.

## 2. SYSTEM ARCHITECTURE & DECOUPLED FULL-STACK FLOW

The application utilizes a decoupled, hybrid architecture separating the client delivery mechanism from the core transactional API:

*   **Frontend Presentation Layer (Next.js):** Built on the Next.js App Router paradigm, handling UI rendering, client-side routing, static asset delivery, and the interactive administrative dashboard via React Server Actions.
*   **Backend Transactional Engine (Express.js):** An independent Express.js server running on port 5000 (`server.js`). This isolates the write-heavy registration logic from the frontend build process.

**End-to-End Data Flow:**
1.  **Client Interaction:** Users complete the `RegistrationForm`. Client-side validation is enforced via React Hook Form and Zod.
2.  **API Transmission:** Upon passing client checks, a `POST` fetch request is transmitted to the independent Express server (`http://localhost:5000/api/register`).
3.  **Server Validation & Processing:** The Express server intercepts the payload, re-validates it against a strict server-side Zod schema to prevent bypassing, and calculates age heuristics.
4.  **Database Persistence:** The Express route utilizes the Prisma Client (equipped with `@prisma/adapter-mariadb`) to execute a secure `INSERT` operation into the MySQL database.
5.  **Client Resolution:** A JSON success/failure response is returned to the client. On success, the Next.js frontend updates its localized LocalStorage history state and presents the confirmation UI without requiring a hard page reload.

*(Note: The Admin Dashboard utilizes a hybrid approach, leveraging Next.js Server Actions directly against Prisma for read-only roster queries, maximizing dashboard load performance.)*

## 3. UNIFIED TECHNICAL STACK MATRIX

| Layer | Technology | Purpose & Implementation Details |
| :--- | :--- | :--- |
| **Frontend Framework** | Next.js 16.x (App Router) | Core React framework, Server Components, Routing. |
| **UI / Styling** | Tailwind CSS v4, Lucide React | Utility-first styling, Dark-mode first UI, SVG iconography. |
| **Backend API** | Node.js, Express.js 5.x | Independent REST API server for processing registrations. |
| **Data validation** | Zod | Shared strict schema validation across client forms and server endpoints. |
| **Database ORM** | Prisma 7 | Type-safe database interactions and schema migrations. |
| **Database Driver** | Prisma MariaDB Adapter, MySQL2 | Native Edge-compatible connection handling to MySQL target. |
| **Security / Auth** | BcryptJS, JWT | Cryptographic hashing for admin credentials; session tokenization. |

## 4. STATE MANAGEMENT, ASSETS, & UX ARCHITECTURE

*   **Client-Side Session Caching:** The application implements an elegant, frictionless session state via Browser `LocalStorage`. Instead of forcing users to create traditional accounts (which creates registration friction), the system caches an array of successful registration summaries locally. This allows a single user (e.g., a coach or parent) to view their specific "Filled Forms History" across multiple browser sessions securely.
*   **Asset Architecture:** Static assets are served globally from the `public/` directory. Visual assets, such as `vijay-shigwan.jpg`, are structurally mapped in `public/images/` and optimized for fast delivery. SVG icons are utilized for core UI elements to ensure crisp rendering across all DPI displays.
*   **UX Design:** The architecture enforces a premium "Dark Mode" aesthetic using tailored color tokens (`surface-950`, `brand-crimson`, `brand-gold`). It employs Radix UI primitives for accessible interactive elements (Accordions, Tooltips) and implements immediate visual feedback loops for form validation.

## 5. COMPREHENSIVE SECURITY & CRISIS MATRIX

The repository implements a stringent security posture specifically targeting administrative access and data integrity:

*   **Environment-First Initialization:** The Admin Passphrase (`ADMIN_PASSWORD`) is strictly loaded from `.env.local`. Plain-text credentials are never hardcoded into the repository.
*   **Cold-Start Cryptographic Hashing:** Instead of storing pre-computed hashes or checking plain text against plain text, the server executes `bcrypt.hashSync(passphrase, 10)` **exactly once** during the Node.js cold boot phase. 
*   **Timing-Safe Verification:** When an admin attempts login, the provided input is verified against the in-memory hash using `bcrypt.compare()`.
*   **Exploit Mitigation:** 
    *   *Brute-Force Protection:* Bcrypt's deliberate computational cost (Factor 10) mathematically restricts the speed at which automated password-guessing scripts can operate.
    *   *Endpoint Sniffing:* Even if a malicious actor gains read access to the server memory or intercepts internal network traffic, they only retrieve the one-way bcrypt hash, which cannot be reverse-engineered to formulate a valid login payload.
    *   *SQL Injection:* Prisma ORM inherently parameterizes all database queries, neutralizing SQL injection vectors across all input fields.

## 6. FINAL RECOMMENDATIONS FOR PRODUCTION DEPLOYMENT

To successfully transition this repository into a live, public-facing production environment, the following operational steps must be executed:

1.  **Frontend Deployment (Vercel):**
    *   Deploy the Next.js application to Vercel for edge-optimized delivery.
    *   **Action Required:** Refactor the hardcoded `http://localhost:5000` fetch URL in `RegistrationForm.tsx` to utilize an environment variable (e.g., `process.env.NEXT_PUBLIC_API_URL`) to point to the live backend.
2.  **Backend Deployment (Render / Railway):**
    *   Deploy the `server.js` Express application as a standalone Node Web Service.
    *   **Action Required:** Configure strict `CORS` policies in Express to exclusively allow `Origin` requests from the Vercel frontend domain, rejecting all other cross-origin traffic.
3.  **Database Migration (Supabase / PlanetScale):**
    *   Transition from the local MySQL instance to a managed, highly available cloud database pool.
    *   **Action Required:** Update the `DATABASE_URL` in the production environment. Run `npx prisma migrate deploy` during the CI/CD pipeline to construct the production schema.
4.  **Environment Variable Provisioning:**
    *   Ensure strict cryptographic keys are injected into the production environment: `ADMIN_PASSWORD` (strong alphanumeric string) and `JWT_SECRET` (256-bit cryptographically secure token).
5.  **SSL/TLS Enforcement:**
    *   Ensure both frontend and backend traffic is forced over HTTPS, securing the transmission of PII (Personally Identifiable Information) during the registration flow.
