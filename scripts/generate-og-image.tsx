import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");

// Dark mode colors from index.css
const colors = {
  bg: "#0f1410",
  bgAlt: "#151c17",
  text: "#e8ebe9",
  textMuted: "#a0a8a2",
};

async function loadFont(url: string): Promise<ArrayBuffer> {
  const response = await fetch(url);
  return response.arrayBuffer();
}

async function generateOgImage() {
  const [fontRegular, fontBold] = await Promise.all([
    loadFont(
      "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.woff",
    ),
    loadFont(
      "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYAZ9hjp-Ek-_EeA.woff",
    ),
  ]);

  const icon = `data:image/svg+xml,${encodeURIComponent(
    readFileSync(join(rootDir, "public/icon.svg"), "utf-8"),
  )}`;

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: `linear-gradient(135deg, ${colors.bg} 0%, ${colors.bgAlt} 100%)`,
          fontFamily: "Inter",
        },
        children: [
          // Icon + title
          {
            type: "div",
            props: {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "24px",
                marginBottom: "24px",
              },
              children: [
                { type: "img", props: { src: icon, width: 100, height: 100 } },
                {
                  type: "span",
                  props: {
                    style: {
                      fontSize: 80,
                      fontWeight: 700,
                      color: colors.text,
                      letterSpacing: "-0.02em",
                    },
                    children: "Switchyard",
                  },
                },
              ],
            },
          },
          // Tagline
          {
            type: "div",
            props: {
              style: {
                fontSize: 36,
                fontWeight: 500,
                color: colors.textMuted,
              },
              children: "A rule-based browser launcher for Linux.",
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Inter", data: fontRegular, weight: 400, style: "normal" },
        { name: "Inter", data: fontRegular, weight: 500, style: "normal" },
        { name: "Inter", data: fontBold, weight: 700, style: "normal" },
      ],
    },
  );

  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } });
  const pngBuffer = resvg.render().asPng();

  writeFileSync(join(rootDir, "public/og-image.png"), pngBuffer);
  console.log("Generated public/og-image.png");
}

generateOgImage().catch(console.error);
