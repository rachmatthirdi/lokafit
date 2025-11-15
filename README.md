# LokaFit - Fashion Styling Assistant PWA

LokaFit adalah aplikasi Progressive Web App (PWA) untuk mengelola lemari pakaian digital dengan fitur-fitur visual yang menarik. **Saat ini adalah PROTOTIPE frontend-only tanpa database dan AI backend.**

## 📋 Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Tech Stack](#tech-stack)
- [Instalasi Lokal](#instalasi-lokal)
- [Struktur Proyek](#struktur-proyek)
- [PWA Setup](#pwa-setup)
- [Testing & Preview](#testing--preview)
- [Deployment](#deployment)
- [Development Roadmap](#development-roadmap)
- [Panduan Next Steps](#panduan-next-steps)

## ✨ Fitur Utama (Prototype)

Aplikasi ini menampilkan tampilan dan interaksi lengkap untuk:

### 1. Home Dashboard
- Daily outfit recommendations dengan weather info
- Filter rekomendasi berdasarkan hari
- Modal detail dengan opsi sinkronisasi pasangan
- Feed inspirasi dengan masonry grid layout
- Heart dan bookmark interactions

### 2. Digital Wardrobe
- Tab view untuk Lemari Permanen vs Draft
- Item gallery dengan kategori dan warna
- FAB menu untuk scan pakaian
- Smooth hover effects dan transitions

### 3. Virtual Try-On (2D)
- 2D manekin SVG interaktif
- Pose selection (Front, Side, 3/4 View)
- Item selector dari wardrobe
- Navigation dengan chevron buttons

### 4. Profile & Settings
- Edit data diri dan data tubuh
- Skin tone settings dengan color palette
- VTO customization (hair color, pose)
- Expandable sections dengan smooth animations

### 5. PWA Features
- Installable on iOS & Android home screen
- Service worker dengan offline support
- Responsive mobile-first design
- Touch-optimized interface

## 🛠 Tech Stack

**Frontend Only (Prototype)**
- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: lucide-react
- **Animations**: Tailwind CSS + built-in transitions

**Build & Deploy**
- **Package Manager**: pnpm (recommended)
- **Build Tool**: Turbopack (Next.js 16)
- **Deploy**: Vercel
- **PWA**: Service Worker + Manifest.json

## 🚀 Instalasi Lokal

### Prerequisites
- Node.js 18+
- pnpm 8+ (atau npm/yarn)
- Git

### Installation Steps

\`\`\`bash
# 1. Clone repository
git clone https://github.com/yourusername/lokafit-frontend.git
cd lokafit-frontend

# 2. Install dependencies
pnpm install

# 3. Jalankan development server
pnpm dev

# 4. Buka di browser
# http://localhost:3000
\`\`\`

### Quick Commands

\`\`\`bash
# Development
pnpm dev              # Start dev server dengan hot reload

# Production Build
pnpm build            # Build untuk production
pnpm start            # Run production build locally

# Maintenance
pnpm lint             # Check code quality
pnpm format           # Format code dengan Prettier
\`\`\`

## 📂 Struktur Proyek

\`\`\`
lokafit-frontend/
├── app/
│   ├── (main)/                    # Main app dengan bottom navigation
│   │   ├── page.tsx              # Home dashboard
│   │   ├── layout.tsx            # Main layout
│   │   ├── wardrobe/
│   │   │   └── page.tsx          # Wardrobe management
│   │   ├── try-on/
│   │   │   └── page.tsx          # Virtual try-on
│   │   ├── shop/
│   │   │   └── page.tsx          # Shop (placeholder)
│   │   ├── product/
│   │   │   └── [id]/page.tsx     # Product detail
│   │   └── profile/
│   │       └── page.tsx          # Profile & settings
│   ├── (auth)/                   # Auth pages (optional)
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Global styles & tokens
│
├── components/
│   └── navigation/
│       └── bottom-navigation.tsx # Bottom nav bar
│
├── public/
│   ├── manifest.json             # PWA manifest
│   ├── sw.js                     # Service worker
│   ├── fashion-outfit-*.png      # Sample images
│   └── icons/                    # App icons
│
├── package.json
├── tsconfig.json
├── next.config.ts
└── README.md
\`\`\`

## 🎨 Design System

### Color Palette (Semantic Tokens)
\`\`\`css
--color-primary: #0066ff          /* Brand blue */
--color-surface: #f8f9fa          /* Light backgrounds */
--color-foreground: #1a1a1a       /* Text color */
--color-muted: #6b7280            /* Secondary text */
--color-border: #e5e7eb           /* Border/divider */
--color-success: #10b981
--color-error: #ef4444
\`\`\`

### Typography
- **Headers**: Geist Sans (bold)
- **Body**: Geist Sans (regular)
- **Mono**: Geist Mono (code)

## 🔍 Testing & Preview

### Desktop Browser
1. Buka Chrome/Edge/Firefox
2. Buka `http://localhost:3000`
3. Gunakan Chrome DevTools (F12) → Device Toolbar untuk mobile emulation

### Mobile Emulation
\`\`\`bash
# Di Chrome DevTools
1. Press F12
2. Click Device Toolbar icon (Ctrl+Shift+M)
3. Select mobile device
4. Test responsiveness
\`\`\`

### PWA Testing
\`\`\`bash
# 1. Di Chrome DevTools
Application tab → Service Workers → Check registration

# 2. Install prompt
Akan muncul install prompt di mobile atau bisa di menu Chrome

# 3. Offline testing
Network tab → select "Offline" → Refresh halaman
\`\`\`

### Performance Testing
\`\`\`bash
# 1. Build preview
pnpm build
pnpm start

# 2. Lighthouse audit
Chrome DevTools → Lighthouse → Generate report
\`\`\`

## 🚀 Deployment

### Deploy ke Vercel (Recommended)

\`\`\`bash
# 1. Push ke GitHub
git add .
git commit -m "Initial commit"
git push origin main

# 2. Connect ke Vercel
npm install -g vercel
vercel

# 3. Follow prompts
# - Select GitHub repository
# - Deploy akan otomatis triggered

# 4. Live URL
# https://lokafit-xxx.vercel.app
\`\`\`

### Deploy ke Netlify

\`\`\`bash
# 1. Build
pnpm build

# 2. Install Netlify CLI
npm install -g netlify-cli

# 3. Deploy
netlify deploy --prod --dir=.next
\`\`\`

## 📱 Mobile Installation

### iOS (Safari)
1. Buka Safari
2. Tap Share button
3. Scroll → "Add to Home Screen"
4. Confirm

### Android (Chrome)
1. Buka Chrome
2. Tap menu (3 dots)
3. Tap "Install app" atau "Add to Home Screen"
4. Confirm

## 🗺️ Development Roadmap

Saat ini aplikasi ini adalah **PROTOTIPE FRONTEND-ONLY** untuk showcase tampilan dan interaksi. Untuk deployment production, Anda akan perlu menambahkan:

### Phase 1: Backend Setup (Estimated: 2-4 minggu)

Backend akan dibuat sebagai **separate service** menggunakan:
- **Framework**: FastAPI (Python)
- **Deployment**: Railway, Render, atau Fly.io
- **Database**: Supabase PostgreSQL

3 AI Systems:
1. **Garment Processor** - Scan pakaian, extract warna & ukuran
2. **Profile Analyzer** - Analisis skin tone dari foto wajah
3. **MixMatch Recommender** - Rekomendasi outfit berdasarkan teori warna

### Phase 2: Frontend + Backend Integration (Estimated: 2-3 minggu)

- Update API calls di frontend
- Add database persistence
- Implement authentication (Supabase Auth atau custom)
- Add real image uploads & processing

### Phase 3: Advanced Features (Estimated: 4-8 minggu)

- Real AR virtual try-on (WebGL/Three.js)
- Push notifications
- Pairing system (couple features)
- Payment integration

## 📚 Panduan Next Steps

### Untuk Developer yang Melanjutkan Proyek Ini:

**Jika ingin menambahkan Backend & AI:**

1. Baca dokumentasi di: `docs/BACKEND_INTEGRATION_GUIDE.md` (akan dibuat)
2. Fork repository backend: `https://github.com/yourusername/lokafit-backend`
3. Setup FastAPI project dengan 3 AI systems
4. Update `.env.local` dengan `NEXT_PUBLIC_API_URL`
5. Integrate API calls di components

**Jika ingin menambahkan Database:**

1. Setup Supabase project: https://supabase.com
2. Create tables untuk: users, wardrobe_items, ootd_history
3. Setup authentication dengan Supabase Auth
4. Update components dengan real data fetching

**Jika ingin improve UI/UX:**

1. Customize color tokens di `app/globals.css`
2. Add new components di `components/`
3. Optimize animations & transitions
4. Test di berbagai device sizes

### Prompt untuk AI Development

Jika menggunakan AI untuk lanjutan development, gunakan prompt berikut:

\`\`\`
Aplikasi LokaFit adalah fashion styling PWA frontend-only yang sudah ada.

Fitur saat ini:
- Home dashboard dengan OOTD recommendations
- Digital wardrobe management dengan 2 tabs
- Virtual try-on 2D dengan pose selection
- Profile & settings page
- PWA features (offline, installable)
- Responsive mobile-first design

Struktur: Next.js 16, TypeScript, Tailwind CSS v4, lucide-react icons

Task: [Jelaskan apa yang ingin Anda tambahkan]

Instruksi:
1. Baca semua file yang relevan terlebih dahulu
2. Jangan ubah struktur folder yang ada
3. Update hanya file yang diperlukan
4. Gunakan design tokens yang ada di globals.css
5. Pastikan responsive untuk mobile
6. Ikuti coding patterns yang sudah ada
\`\`\`

## 🐛 Troubleshooting

### Port 3000 sudah digunakan
\`\`\`bash
pnpm dev -- -p 3001
\`\`\`

### Build error
\`\`\`bash
rm -rf .next node_modules
pnpm install
pnpm build
\`\`\`

### Service Worker tidak teregister
- Clear browser cache
- Hard refresh (Ctrl+Shift+R)
- Check console untuk errors

### Image tidak load
- Pastikan path relatif dari `public/` folder
- Gunakan format: `/image-name.png`
- Check file extension (case-sensitive)

## 📞 Support & Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS v4**: https://tailwindcss.com
- **PWA Documentation**: https://web.dev/progressive-web-apps/
- **Service Workers**: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API

## 📄 License

MIT License

## 👥 Credits

- **Created by**: Wyena Style Team
- **Contact**: support@lokafit.app

---

**LokaFit - Prototype Frontend Ready for Development** 🚀
