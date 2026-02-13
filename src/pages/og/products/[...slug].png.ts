import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import fs from "fs";
import path from "path";

export async function getStaticPaths() {
    const products = await getCollection("products");
    return products.map((product) => ({
        params: { slug: product.slug },
        props: product,
    }));
}

export const GET: APIRoute = async ({ props }) => {
    const product = props as CollectionEntry<"products">;

    // Load Fonts
    const fontRegular = fs.readFileSync(
        path.join(
            process.cwd(),
            "node_modules/@fontsource/inter/files/inter-latin-400-normal.woff"
        )
    );
    const fontBold = fs.readFileSync(
        path.join(
            process.cwd(),
            "node_modules/@fontsource/inter/files/inter-latin-700-normal.woff"
        )
    );

    // Load Image
    let imageBuffer: Buffer | null = null;
    if (product.data.heroImage) {
        // Resolve path. heroImage is relative to src/content/products/
        // e.g. "../../assets/uploads/image.jpg"
        // We need to resolve to src/assets/uploads/image.jpg
        // Simplest way: replace ../.. with src
        // Or cleaner: construct path
        const imagePathStr = product.data.heroImage as unknown as string; // It's a string in frontmatter
        // Note: Astro content collections might treat image as an object if defined as image() in schema.
        // In config.yml it is "image" widget. In config.ts it is "image()".
        // If it's image(), product.data.heroImage is an object { src: ..., width: ..., etc } in the .astro file,
        // but here in .ts endpoint, is it processed?
        // With schema image(), it returns an object with fsPath usually?
        // Let's assume it provides enough info. Use console.log during build if needed.
        // Actually, for getCollection in .ts, image() helper returns an object with `fsPath`!

        // Let's try to access fsPath if available, or fall back to resolving string.
        const heroImage: any = product.data.heroImage;
        const potentialPath = heroImage?.fsPath;

        if (potentialPath && fs.existsSync(potentialPath)) {
            imageBuffer = fs.readFileSync(potentialPath);
        }
    }

    const imageBase64 = imageBuffer ? `data:image/jpeg;base64,${imageBuffer.toString("base64")}` : "";

    const markup = {
        type: "div",
        props: {
            style: {
                display: "flex",
                height: "100%",
                width: "100%",
                backgroundColor: "#fff0f3", // rose-50
                backgroundImage: imageBase64 ? `url('${imageBase64}')` : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
                flexDirection: "column",
                justifyContent: "flex-end",
            },
            children: [
                {
                    type: "div",
                    props: {
                        style: {
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                            width: "100%",
                            padding: "40px",
                            background: "linear-gradient(to top, rgba(88, 28, 51, 0.9) 0%, rgba(88, 28, 51, 0) 100%)", // rose-950
                        },
                        children: [
                            {
                                type: "div",
                                props: {
                                    style: {
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "10px",
                                    },
                                    children: [
                                        {
                                            type: "h1",
                                            props: {
                                                children: product.data.title,
                                                style: {
                                                    fontSize: "64px",
                                                    fontWeight: 700,
                                                    color: "#fff",
                                                    margin: 0,
                                                    fontFamily: "Inter",
                                                },
                                            },
                                        },
                                        {
                                            type: "div",
                                            props: {
                                                children: `${product.data.price.toFixed(2)} €`,
                                                style: {
                                                    fontSize: "48px",
                                                    fontWeight: 700,
                                                    color: "#fbbf24", // amber-400
                                                    fontFamily: "Inter",
                                                },
                                            },
                                        },
                                    ],
                                },
                            },
                            {
                                type: "div",
                                props: {
                                    children: "Zum Shop",
                                    style: {
                                        backgroundColor: "#e11d48", // rose-600
                                        color: "white",
                                        fontSize: "32px",
                                        fontWeight: 600,
                                        padding: "15px 40px",
                                        borderRadius: "50px",
                                        fontFamily: "Inter",
                                        marginBottom: "10px",
                                    },
                                },
                            },
                        ],
                    },
                },
            ],
        },
    };

    const svg = await satori(markup as any, {
        width: 1200,
        height: 630,
        fonts: [
            {
                name: "Inter",
                data: fontRegular,
                weight: 400,
                style: "normal",
            },
            {
                name: "Inter",
                data: fontBold,
                weight: 700,
                style: "normal",
            },
        ],
    });

    const resvg = new Resvg(svg);
    const pngData = resvg.render();
    const pngBuffer = pngData.asPng();

    return new Response(pngBuffer, {
        headers: {
            "Content-Type": "image/png",
        },
    });
};
