# Kode Referral ShopeePay Lander (High-Performance SEO Engine)

**Live Site:** [shopeepayreferral.web.id](https://shopeepayreferral.web.id) | **Kode:** `JL3D5DYVW`

## 🚀 Tentang Project Ini

Repository ini adalah source code untuk landing page Kode Referral ShopeePay, yang dirancang khusus untuk mendominasi SERP (*Search Engine Results Page*). Project ini bukan sekadar website statis biasa, melainkan sebuah SEO Engine yang dibangun di atas **Astro 5** untuk mencapai skor Core Web Vitals sempurna (100/100).

Fokus utama teknis project ini adalah memenangkan kata kunci kompetitif seperti *"Kode Referral ShopeePay Terbaru"*, *"Bonus Pengguna Baru"*, dan *"Cara Klaim ShopeePay"* melalui arsitektur kode yang bersih dan terstruktur.

---

## ⚡ Mengapa Website Ini Cepat & Ranking?

Project ini menerapkan teknik advanced Technical SEO yang jarang digunakan website kompetitor:

### 1. Zero-Javascript By Default (Island Architecture)
Menggunakan **Astro 5**, website ini mengirimkan **0kB JavaScript** ke client secara default. Interaksi (seperti timer mundur atau modal) hanya di-load saat diperlukan (*hydration*), membuat *First Contentful Paint (FCP)* di bawah **0.8 detik**.

### 2. Dynamic Schema Injection (JSON-LD)
Mesin pencari membutuhkan struktur data. Project ini memiliki fitur Custom Schema Injection via **Keystatic CMS**, memungkinkan penyisipan schema spesifik per artikel:
* `Product Schema` (Untuk review fitur ShopeePay)
* `FAQPage Schema` (Untuk menjawab pertanyaan user langsung di Google)
* `BlogPosting Schema` (Standar artikel)

### 3. Server-Side FOMO Logic
Untuk meningkatkan konversi kode referral `JL3D5DYVW`, website menggunakan logika tanggal dinamis di sisi server:
* **Auto-Update Titles:** Judul halaman otomatis berubah mengikuti bulan berjalan (misal: "Promo Januari 2026").
* **Dynamic Metadata:** Deskripsi meta tag selalu relevan tanpa edit manual.

---

## 🛠 Tech Stack

| Komponen | Teknologi | Alasan Penggunaan |
| :--- | :--- | :--- |
| **Core** | Astro 5.0 | Performa statis tak tertandingi & Content Collections API. |
| **Styling** | Tailwind CSS | Utility-first, purgeCSS otomatis untuk ukuran file kecil. |
| **CMS** | Keystatic | Git-based CMS. Tidak butuh database eksternal, konten menyatu dengan repo. |
| **Hosting** | Cloudflare Pages | Edge network global, TTFB (*Time to First Byte*) sangat rendah. |
| **Iconography** | Phosphor Icons | Konsistensi visual UI. |

---

## 📂 Struktur SEO Content

Project ini menggunakan validasi konten yang ketat dengan **Zod Schema** (`src/content.config.ts`) untuk memastikan setiap artikel memenuhi standar SEO sebelum build:

```typescript
// Contoh Validasi SEO di Project Ini
seo: z.object({
    metaTitle: z.string().max(60).optional(), // Mencegah judul terpotong di Google
    metaDescription: z.string().max(160).optional(), // Mencegah deskripsi terpotong
    noIndex: z.boolean().optional(), // Kontrol indexing halaman
    extraSchema: z.string().optional() // Slot untuk raw JSON-LD
})
