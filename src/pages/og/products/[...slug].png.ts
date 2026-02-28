import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import fs from "fs";
import path from "path";
import sharp from "sharp";

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

    try {
        // 1. Try to use fsPath from Astro's image() schema
        const heroImage: any = product.data.heroImage;
        if (heroImage?.fsPath && fs.existsSync(heroImage.fsPath)) {
            imageBuffer = fs.readFileSync(heroImage.fsPath);
        } else {
            // 2. Fallback: Resolve path manually from markdown frontmatter
            const productFilePath = path.join(process.cwd(), "src/content/products", `${product.id}`);
            if (fs.existsSync(productFilePath)) {
                const fileContent = fs.readFileSync(productFilePath, "utf-8");
                const match = fileContent.match(/heroImage:\s*["']?([^"'\n]+)["']?/);
                if (match && match[1]) {
                    const relativePath = match[1];
                    const absolutePath = path.resolve(path.dirname(productFilePath), relativePath);
                    if (fs.existsSync(absolutePath)) {
                        imageBuffer = fs.readFileSync(absolutePath);
                    }
                }
            }
        }

        // 3. Resize Image (Critical for Satori performance with large images)
        if (imageBuffer) {
            imageBuffer = await sharp(imageBuffer)
                .resize({ width: 1200, height: 630, fit: "cover" })
                .jpeg({ quality: 80 })
                .toBuffer();
        }

    } catch (e) {
        console.error("Error loading/resizing OG image:", e);
    }

    const imageBase64 = imageBuffer ? `data:image/jpeg;base64,${imageBuffer.toString("base64")}` : "";

    const markup = {
        type: "div",
        props: {
            style: {
                display: "flex",
                height: "100%",
                width: "100%",
                backgroundColor: "#fdf8fb", // rose-50
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
                            background: "linear-gradient(to top, rgba(56, 46, 53, 0.9) 0%, rgba(56, 46, 53, 0) 100%)", // rose-950
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
                                        backgroundColor: "#876d7c", // rose-600
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

    return new Response(pngBuffer as any, {
        headers: {
            "Content-Type": "image/png",
        },
    });
};
