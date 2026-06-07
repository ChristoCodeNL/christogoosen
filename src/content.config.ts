import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
							  schema: ({ image }) =>
							  z.object({
								  title: z.string(),
									   description: z.string(),
									   pubDate: z.coerce.date(),
									   updatedDate: z.coerce.date().optional(),
									   heroImage: z.optional(image()),
							  }),
});

const books = defineCollection({
	loader: glob({ base: './src/content/books', pattern: '**/*.{md,mdx}' }),
							   schema: z.object({
								   title: z.string(),
												author: z.string(),
												rating: z.number().min(1).max(5),
												pubDate: z.coerce.date(),
												description: z.string(),
							   }),
});

export const collections = { blog, books };
