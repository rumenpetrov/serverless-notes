import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const templates = defineCollection({
  loader: glob({
    pattern: "**/*.json",
    base: "./src/content/templates",
    generateId: ({ entry }) => {
      const parts = entry.split("/");
      // If the file is template.json in a subfolder, use the subfolder name as the ID
      if (parts.length > 1 && parts[parts.length - 1] === "template.json") {
        return parts[parts.length - 2];
      }
      return entry.replace(/\.json$/, "");
    },
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    version: z.string(),
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
