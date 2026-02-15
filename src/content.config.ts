import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const templates = defineCollection({
    loader: glob({ pattern: "**/*.json", base: "./src/content/templates" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        version: z.number(),
        content: z.array(z.object({
            type: z.string(),
            name: z.string(),
            defaultValue: z.string().optional(),
        })),
    }),
});

export const collections = {
    templates,
};
