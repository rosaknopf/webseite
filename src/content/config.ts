import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        updatedDate: z.coerce.date().optional(),
        heroImage: image().optional(),
        draft: z.boolean().default(false),
    }),
});

const projects = defineCollection({
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        pubDate: z.coerce.date(),
        heroImage: image().optional(),
        status: z.enum(['Completed', 'In Progress']).default('Completed'),
    }),
});

const products = defineCollection({
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        price: z.number(), // Price in EUR
        heroImage: image().optional(),
        gallery: z.array(z.object({
            image: image(),
        })).optional(),
        stripeLink: z.string().optional(), // Payment Link URL
        isPinned: z.boolean().default(false),
        isSoldOut: z.boolean().default(false),
        isUnique: z.boolean().default(true), // 1-of-1 item
        draft: z.boolean().default(false),
        pubDate: z.coerce.date().default(new Date()),
    }),
});

const courses = defineCollection({
    schema: ({ image }) => z.object({
        title: z.string(),
        description: z.string(),
        date: z.string().or(z.date()), // Flexible date string or object
        price: z.number().optional(),
        heroImage: image().optional(),
        duration: z.string().optional(),
        location: z.string().optional(),
    }),
});

const pages = defineCollection({
    schema: ({ image }) => z.object({
        // Home Page Specific
        hero: z.object({
            title: z.string(),
            subtitle: z.string(),
            image: image(),
            buttonText: z.string(),
            buttonLink: z.string(),
        }).optional(),
        intro: z.object({
            title: z.string(),
            text: z.string(),
            image: image(),
            linkText: z.string(),
            linkUrl: z.string(),
        }).optional(),
        features: z.array(z.object({
            title: z.string(),
            link: z.string(),
            image: image(),
        })).optional(),
        instagram: z.object({
            enabled: z.boolean().default(true),
            title: z.string(),
            images: z.array(z.object({
                image: image(),
                link: z.string().optional(),
            })),
        }).optional(),

        // Generic / About Page
        title: z.string(), // Meta Title or Internal
        description: z.string().optional(),
        mainHeading: z.string().optional(), // Page H1
        quote: z.string().optional(),
        heroImage: image().optional(),
    }),
});

const legal = defineCollection({
    schema: z.object({
        title: z.string(),
        updatedDate: z.coerce.date().optional(),
    }),
});

export const collections = { blog, projects, products, courses, pages, legal };

