import { config, fields, collection } from '@keystatic/core';

export default config({
storage: {
    kind: 'cloud',
  },
  cloud: {
    // Ganti 'team-kamu/nama-project' dengan yang kamu copy dari dashboard keystatic.cloud
    // Contoh: 'nando-rifky/shopeepay-blog'
    project: 'shopeepay/referral-shopeepay', 
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'src/content/blog/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        description: fields.text({ label: 'Description', multiline: true }),
        pubDate: fields.date({ label: 'Publication Date' }),
        heroImage: fields.image({
          label: 'Hero Image',
          directory: 'public/blog-images',
          publicPath: '/blog-images/',
        }),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/blog-images',
            publicPath: '/blog-images/',
          },
        }),
      },
    }),
  },
});