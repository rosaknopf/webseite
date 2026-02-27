import type { APIRoute } from "astro";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import fs from "fs";
import path from "path";

export const GET: APIRoute = async () => {
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

    // Load logo if possible
    let logoBase64 = "";
    try {
        const logoPath = path.join(process.cwd(), "public/rosa-knopf-logo.png");
        if (fs.existsSync(logoPath)) {
            const logoBuffer = fs.readFileSync(logoPath);
            logoBase64 = `data:image/png;base64,${logoBuffer.toString("base64")}`;
        }
    } catch (e) {
        console.error("Could not load logo for default OG image");
    }

    const markup = {
        type: "div",
        props: {
            style: {
                display: "flex",
                height: "100%",
                width: "100%",
                backgroundColor: "#fff0f3",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
            },
            children: [
                {
                    type: "div",
                    props: {
                        style: {
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "20px",
                        },
                        children: [
                            ...(logoBase64 ? [{
                                type: "img",
                                props: {
                                    src: logoBase64,
                                    width: 150,
                                    height: 150,
                                    style: {
                                        borderRadius: "20px",
                                    },
                                },
                            }] : []),
                            {
                                type: "h1",
                                props: {
                                    children: "Der Rosa Knopf",
                                    style: {
                                        fontSize: "72px",
                                        fontWeight: 700,
                                        color: "#4c0519", // rose-950
                                        margin: 0,
                                        fontFamily: "Inter",
                                    },
                                },
                            },
                            {
                                type: "p",
                                props: {
                                    children: "Handgemachte Unikate für Sie.",
                                    style: {
                                        fontSize: "36px",
                                        fontWeight: 400,
                                        color: "#be123c", // rose-700
                                        margin: 0,
                                        fontFamily: "Inter",
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
