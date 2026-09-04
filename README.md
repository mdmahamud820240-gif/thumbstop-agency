# 💎 ThumbStop — Luxury Digital Agency Website & Visual Admin CMS

> **Tagline:** *"Got Stopped? It's ThumbStop"*  
> **Headquarters:** Dhaka, Bangladesh  
> **Core Disciplines:** 8 Specialized Digital Services  
> **Technology:** Next.js (App Router) + TypeScript + Tailwind CSS

---

## ⚡️ Visual Admin Control Center (`/admin`)

You can manage all text, prices, WhatsApp numbers, services, and display order **without touching any code** through your visual Admin Panel:

👉 **URL:** [http://localhost:3000/admin](http://localhost:3000/admin)  
🔑 **Default Passcode:** `thumbstop2026`

### Features in the Admin Panel:
1. **Services Manager (Full CRUD & Reordering):**
   - **Move Up (▲) / Move Down (▼)**: Change which service appears first on the homepage with a single click.
   - **Edit Service**: Change English & Bengali titles, starting prices (e.g. `৳10,000+`), badges, and descriptions.
   - **Add New Service**: Add a completely new service discipline that automatically shows up on Home, Services, and Contact pages.
   - **Delete Service**: Remove any service you no longer offer.
2. **Business & Contact Settings:**
   - Change Phone number, WhatsApp number, Email, and physical Dhaka address.
   - Any change automatically updates all WhatsApp chat links across the site instantly.
3. **Branding & Accent Colors:**
   - Switch live between Brand Teal, Electric Cyan, Royal Blue, and Luxury Gold.
4. **Backup & Reset:**
   - **Download Content Backup (JSON)**: 1-click download of your entire website data.
   - **Upload JSON Backup**: Restore previous versions or migrate between servers.
   - **Reset to Defaults**: Revert back to the initial ThumbStop agency content at any time.

---

## 🚀 How to Run Locally

1. Open your terminal in this directory (`/Users/rahman/.gemini/antigravity-ide/scratch/thumbstop`):
```bash
npm run dev
```
2. Open [http://localhost:3000](http://localhost:3000) in your browser.
3. To open the Admin CMS, visit [http://localhost:3000/admin](http://localhost:3000/admin) or click the **"Admin CMS"** link in the footer.

---

## 🌐 Domain & Hosting Guide (How to Go Public)

### 1. Recommended Domains:
- `thumbstop.agency` (Most premium for an international digital agency)
- `thumbstopbd.com` or `thumbstop.com`
- You can purchase via **Namecheap**, **Porkbun**, or local Bangladeshi providers (e.g. ExonHost, Dianahost) for ~$10–$12/year.

### 2. Best Hosting Options:

#### Option A: Vercel (Recommended — 100% Free & Fastest)
1. Push this project folder to your GitHub account (`git push`).
2. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
3. Select your repository and click **"Deploy"**.
4. In your Vercel project settings, click **Domains** and enter your purchased domain (`thumbstop.agency`). Done!

#### Option B: Standard cPanel Hosting (Static Export)
1. In your terminal, run:
   ```bash
   npm run build
   ```
2. Open the newly generated `out/` folder.
3. Compress the contents of `out/` into a `.zip` file.
4. Log into your cPanel -> File Manager -> `public_html`.
5. Upload and extract the zip file. Your website is instantly live!

---

## 📂 Project Architecture

```text
thumbstop/
├── src/
│   ├── app/
│   │   ├── layout.tsx         # Root layout with ContentProvider & Google Fonts
│   │   ├── globals.css        # Luxury design tokens, glassmorphism & gradients
│   │   ├── page.tsx           # Dynamic Home page
│   │   ├── services/page.tsx  # Dynamic 8-service catalog
│   │   ├── pricing/page.tsx   # Dynamic package pricing & FAQs
│   │   ├── about/page.tsx     # Agency story, mission & values
│   │   ├── contact/page.tsx   # Direct WhatsApp, phone, email & form
│   │   └── admin/page.tsx     # ⭐️ VISUAL ADMIN CMS DASHBOARD
│   ├── context/
│   │   └── ContentContext.tsx # ⭐️ Live state engine & local storage sync
│   ├── components/
│   │   ├── Navbar.tsx         # Sticky glassmorphism header & mobile menu
│   │   ├── Footer.tsx         # Quick links, Dhaka address & Admin CMS link
│   │   ├── HeroMoment.tsx     # Deliberate luxury hero moment
│   │   ├── ServiceCard.tsx    # Reusable service card component
│   │   ├── PricingCard.tsx    # Reusable pricing card with gold cues
│   │   ├── ProcessTimeline.tsx# 3-step sequence component (Planning→Design→Dev)
│   │   ├── ContactForm.tsx    # Dynamic form with WhatsApp integration
│   │   ├── TrustSection.tsx   # Why high-performing brands choose ThumbStop
│   │   ├── SectionHeading.tsx # Elegant luxury section title component
│   │   └── ServiceIcon.tsx    # Dynamic Lucide icon mapper
│   └── data/
│       └── content.ts         # Base fallback data & TypeScript types
├── next.config.ts             # Static export configuration (`output: 'export'`)
├── package.json
└── README.md
```
