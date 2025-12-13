import { config, fields, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'cloud',
  },
  cloud: {
    // Pastikan nama project ini sesuai dashboard keystatic kamu
    project: 'shopeepay/referral-shopeepay', 
  },
  collections: {
    blog: collection({
      label: 'Blog Posts',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Judul Artikel' } }),
        
        // 1. TOPIC / TAGS
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          {
            label: 'Tags / Topik',
            itemLabel: (props) => props.value,
            description: 'Tambahkan topik terkait untuk grouping artikel (Misal: Tutorial, Promo).',
          }
        ),

        description: fields.text({ label: 'Ringkasan Singkat (Excerpt)', multiline: true }),
        pubDate: fields.date({ label: 'Tanggal Publish' }),
        updatedDate: fields.date({ label: 'Tanggal Update (Opsional)' }),

        // 2. ADVANCED HERO IMAGE (Gambar + Alt + Caption)
        heroImage: fields.object({
          src: fields.image({
            label: 'File Gambar',
            directory: 'public/blog-images',
            publicPath: '/blog-images/',
            validation: { isRequired: true },
          }),
          alt: fields.text({ 
            label: 'Alt Text (SEO)', 
            description: 'Deskripsi gambar untuk Google. Wajib diisi untuk SEO!' 
          }),
          caption: fields.text({ 
            label: 'Caption / Kredit', 
            description: 'Teks kecil di bawah gambar (Opsional)' 
          }),
        }, { label: 'Gambar Utama (Hero)' }),

        // 3. CONDITIONAL SEO (Meta Data Khusus)
        seo: fields.conditional(
          fields.checkbox({ 
            label: 'Setting SEO Manual?', 
            defaultValue: false,
            description: 'Aktifkan untuk kustomisasi Meta Title & Description khusus.'
          }),
          {
            false: fields.empty(),
            true: fields.object({
              metaTitle: fields.text({
                label: 'Meta Title (Custom)',
                description: 'Judul biru di Google. Jika kosong, pakai Judul Artikel. Max 60 kar.',
                validation: { length: { max: 60 } }
              }),
              metaDescription: fields.text({
                label: 'Meta Description (Custom)',
                description: 'Deskripsi di bawah judul Google. Max 160 kar.',
                validation: { length: { max: 160 } },
                multiline: true,
              }),
              canonicalUrl: fields.text({
                label: 'Canonical URL',
                description: 'Isi HANYA jika artikel ini copy-paste dari website lain.'
              }),
              noIndex: fields.checkbox({
                label: 'Sembunyikan dari Google (NoIndex)',
                description: 'Centang jika artikel ini TIDAK mau muncul di pencarian.',
                defaultValue: false
              }),
            }),
          }
        ),

        // Menggunakan MDX (agar outputnya .mdx, bukan .mdoc)
        content: fields.mdx({
          label: 'Konten Artikel',
          options: {
            image: {
              directory: 'public/blog-images',
              publicPath: '/blog-images/',
            }
          }
        }),
      },
    }),
  },
});