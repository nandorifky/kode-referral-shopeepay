import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(), // <--- HARUS z.string(), JANGAN image()
		extraSchema: z.string().optional(), 
	}),
});

export const collections = { blog };