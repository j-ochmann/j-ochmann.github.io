import { defineCollection, z } from 'astro:content';
import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				translation_status: z.string().optional(),
				translated_from: z.string().optional(),
				content_hash: z.string().optional(),
				source_hash: z.string().optional(),
			}),
		}),
	}),
};
