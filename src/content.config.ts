import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	
	// VALIDASI SCHEMA (PENTING!)
	schema: z.object({
		title: z.string(),
		description: z.string(),
		
		// Tags bisa kosong (optional array)
		tags: z.array(z.string()).optional(), 
		
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		
		// STRUKTUR BARU HERO IMAGE (Object)
		heroImage: z.object({
			src: z.string(),
			alt: z.string().optional(),
			caption: z.string().optional(),
		}).optional(),

		// STRUKTUR BARU SEO (Conditional)
		seo: z.object({
			discriminant: z.boolean(), // Menangkap true/false dari toggle Keystatic
			value: z.object({
				metaTitle: z.string().optional(),
				metaDescription: z.string().optional(),
				canonicalUrl: z.string().optional(),
				noIndex: z.boolean().optional(),
			}).optional(),
		}).optional(),
	}),
});

export const collections = { blog };