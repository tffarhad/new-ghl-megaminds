import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const pageFields = {
  title: z.string(),
  description: z.string().optional(),
  meta_title: z.string().optional(),
  image: z.string().optional(),
  draft: z.boolean().optional(),
};

// Blog post collection
const blogCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/blog" }),
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
    image: z.string().optional(),
    author: z.string().default("Admin"),
    categories: z.array(z.string()).default(() => ["others"]),
    tags: z.array(z.string()).default(() => ["others"]),
    draft: z.boolean().optional(),
  }),
});

// Author collection
const authorsCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/authors" }),
  schema: z.object({
    ...pageFields,
    social: z
      .array(
        z
          .object({
            name: z.string().optional(),
            icon: z.string().optional(),
            link: z.string().optional(),
          })
          .optional(),
      )
      .optional(),
  }),
});

// Regular pages (business-owners, resellers, case-studies, tools, privacy, terms)
const pagesCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/pages" }),
  schema: z.object({ ...pageFields }),
});

// Homepage
const homepageCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/homepage" }),
  schema: z.object({ ...pageFields }),
});

// About
const aboutCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/about" }),
  schema: z.object({ ...pageFields }),
});

// Contact
const contactCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "src/content/contact" }),
  schema: z.object({ ...pageFields }),
});

export const collections = {
  homepage: homepageCollection,
  about: aboutCollection,
  contact: contactCollection,
  pages: pagesCollection,
  blog: blogCollection,
  authors: authorsCollection,
};
