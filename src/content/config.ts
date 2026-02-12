import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        heroImage: z.string().optional(),
        draft: z.boolean().default(false),
    }),
});

const projects = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        heroImage: z.string().optional(),
        status: z.enum(['Completed', 'In Progress']).default('Completed'),
    }),
});

const products = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        price: z.number(), // Price in EUR
        heroImage: z.string().optional(),
        stripeLink: z.string().optional(), // Payment Link URL
        isSoldOut: z.boolean().default(false),
        isUnique: z.boolean().default(true), // 1-of-1 item
        draft: z.boolean().default(false),
    }),
});

const courses = defineCollection({
    schema: z.object({
        title: z.string(),
        description: z.string(),
        date: z.string().or(z.date()), // Flexible date string or object
        price: z.number().optional(),
        heroImage: z.string().optional(),
        duration: z.string().optional(),
        location: z.string().optional(),
    }),
});

export const collections = { blog, projects, products, courses };
