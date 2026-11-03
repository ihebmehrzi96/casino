# 🎰 Casino Meister & Guru Review Portal (Next.js + PostgreSQL)

An enterprise-grade, high-converting iGaming review portal and watchdog website modeled after **Casinomeister, Casino Guru, CasinoGrounds, and CasinoBee**. Built with **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, and **PostgreSQL with Prisma ORM**.

---

## 🔒 Security & Admin Access Control

The public website is open to players, while the **Administrative Control Panel** is completely locked down and invisible to normal visitors:

1. **Hidden from Public UI**: All public navigation links (Navbar, Footer, etc.) to the admin panel have been removed. Regular site visitors have no visible way of knowing where the admin portal lives.
2. **Next.js Edge Middleware Protection (`src/middleware.ts`)**: Every request to `/admin/*` is intercepted before page rendering. If a visitor does not possess an authenticated session, they are immediately redirected to the locked `/admin/login` page.
3. **Cryptographically Signed Session Cookies (`src/lib/auth.ts`)**: Sessions are authenticated using HMAC-SHA256 signatures with `ADMIN_SECRET_KEY` stored strictly in HTTP-Only, SameSite cookies.
4. **API Mutation Guard**: Unauthorized attempts to call admin endpoints (`POST /api/casinos`, `/api/reviews/[id]/approve`) without valid credentials return an immediate `401 Unauthorized` status.

---

## 🔑 Admin Credentials

Configured in your `.env` file:
* **Admin Login Route:** `http://localhost:3000/admin/login`
* **Default Username:** `admin`
* **Default Password:** `CasinoAdmin2026!SecureKey`
*(You can change these anytime in your `.env` file).*

---

## 🌟 Key Features

### 1. 🛡️ Independent Watchdog & Safety Index
* **Safety Index Protocol (1.0 - 10.0 scale)**: Evaluates casinos based on genuine licensing (MGA, UKGC, Curacao GCB), withdrawal limits, and payout speeds.
* **Rogue Blacklist / Scam Advisory**: Dedicated watchdog warning section exposing unlicensed software, pirated slots, predatory withdrawal limits, and unpaid player tickets.

### 2. ⚡ High-Converting Casino Reviews (`/casinos/[slug]`)
* **Pros & Cons Matrix**: Clean, side-by-side highlight of perks vs cautionary clauses.
* **Bonus & Promo Code Claim Widget**: Wagering requirements, minimum deposit, and one-click copy codes.
* **Financial Specs**: Real payout speeds, payment method badges (Crypto, Visa, Interac, Skrill), and monthly cashout ceilings.
* **Community Player Feedback**: Form allowing users to submit ratings and feedback, queued for admin approval.

### 3. 🎁 Verified Bonuses Directory (`/bonuses`)
* Filter welcome bonuses, no-deposit free spins, reload offers, and exclusive promo codes.

### 4. 🎛️ Protected Admin Panel (`/admin`)
* **Dashboard Metrics**: Active casinos, published bonuses, flagged rogue sites, and pending player reviews.
* **Manage Casinos (`/admin/casinos`)**: Real-time status toggle (Active / Blacklisted), audit updates, and direct links.
* **Add Casino Form (`/admin/casinos/new`)**: Full-featured form to publish new operators, bonus structures, and watchdog scores.
* **Player Review Queue (`/admin/reviews`)**: Moderation approval pipeline to prevent spam and verify real player complaints.
* **Lock & Logout Button**: Instant session invalidation.

### 5. ⚖️ 18+ Responsible Gambling & Affiliate Compliance
* Prominent 18+ disclaimers, BeGambleAware links, and transparent affiliate disclosure notices across header, cards, and footer.

---

## 🚀 Quick Start Guide

### Step 1: Install Dependencies
Open your terminal in this directory (`c:\Users\hp\Desktop\casino`) and run:
```bash
npm install
```

### Step 2: Configure Your PostgreSQL Database
Open the `.env` file in the root directory:
```env
# Local PostgreSQL, Supabase, Neon, or Railway:
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/casinodb?schema=public"

# Admin Authentication & Security
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="CasinoAdmin2026!SecureKey"
ADMIN_SECRET_KEY="c84d720b60e90928929bbce609c2a3928198f121bbcf10984029283948574635"
```

> **Tip:** If you do not have PostgreSQL installed locally, you can create a free cloud PostgreSQL database in 30 seconds at [Supabase](https://supabase.com) or [Neon](https://neon.tech) and paste the connection string into `DATABASE_URL`.

### Step 3: Push Database Schema & Seed Data
Push the Prisma models to your PostgreSQL database:
```bash
npm run db:push
```

Seed initial certified casinos (BitStarz, Stake, LeoVegas, and Rogue blacklist warnings):
```bash
npm run db:seed
```

*(Optional) Explore and edit your database visually with Prisma Studio:*
```bash
npm run db:studio
```

### Step 4: Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser:
* **Public Portal**: [http://localhost:3000](http://localhost:3000)
* **Casino Directory**: [http://localhost:3000/casinos](http://localhost:3000/casinos)
* **Bonuses Finder**: [http://localhost:3000/bonuses](http://localhost:3000/bonuses)
* **Watchdog Blacklist**: [http://localhost:3000/blacklist](http://localhost:3000/blacklist)
* **Secure Admin Login**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
