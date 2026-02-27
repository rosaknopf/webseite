import type { APIRoute } from "astro";
import { getCollection, type CollectionEntry } from "astro:content";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import fs from "fs";
import path from "path";
import sharp from "sharp";

export async function getStaticPaths() {
    const posts = await getCollection("blog");
    return posts.map((post) => ({
        params: { slug: post.slug },
        props: post,
    }));
}

export const GET: APIRoute = async ({ props }) => {
    const post = props as CollectionEntry<"blog">;

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
        const heroImage: any = post.data.heroImage;
        if (heroImage?.fsPath && fs.existsSync(heroImage.fsPath)) {
            imageBuffer = fs.readFileSync(heroImage.fsPath);
        } else {
            const postFilePath = path.join(process.cwd(), "src/content/blog", `${post.id}`);
            if (fs.existsSync(postFilePath)) {
                const fileContent = fs.readFileSync(postFilePath, "utf-8");
                const match = fileContent.match(/heroImage:\s*["']?([^"'\n]+)["']?/);
                if (match && match[1]) {
                    const relativePath = match[1];
                    const absolutePath = path.resolve(path.dirname(postFilePath), relativePath);
                    if (fs.existsSync(absolutePath)) {
                        imageBuffer = fs.readFileSync(absolutePath);
                    }
                }
            }
        }

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
                backgroundColor: "#fff0f3",
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
                            background: "linear-gradient(to top, rgba(88, 28, 51, 0.9) 0%, rgba(88, 28, 51, 0) 100%)",
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
                                                children: post.data.title,
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
                                                children: "Blog | Der Rosa Knopf",
                                                style: {
                                                    fontSize: "36px",
                                                    fontWeight: 400,
                                                    color: "#fecdd3", // rose-200
                                                    fontFamily: "Inter",
                                                },
                                            },
                                        },
                                    ],
                                },
                            }
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
