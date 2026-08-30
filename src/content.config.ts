import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// The folder stays `blog` so the Obsidian vault path does not change.
// The route it publishes to is /essays.
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.optional(image()),
      // Drives the blue label on cards. Defaults to Essay if omitted,
      // so every existing post keeps validating.
      category: z.enum(['Essay', 'Note', 'Case study']).default('Essay'),
      draft: z.boolean().default(false),
    }),
});

const books = defineCollection({
  loader: glob({ base: './src/content/books', pattern: '*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      author: z.string(),
      rating: z.number().min(1).max(5),
      pubDate: z.coerce.date(),
      description: z.string(),
      // Book jacket. Optional: cards fall back to a typographic cover.
      cover: z.optional(image()),
      // Used by the filter row on /books.
      topic: z.enum(['Product', 'Leadership', 'Systems', 'Design', 'Strategy']).optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog, books };
