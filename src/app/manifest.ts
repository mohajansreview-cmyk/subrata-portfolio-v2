import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Subrata Mohajan — Graphic Designer & Brand Visualizer",
    short_name: "Subrata M.",
    description:
      "Portfolio of Subrata Mohajan — brand identity systems, large-format outdoor LED billboards, packaging and commercial visual direction.",
    start_url: "/",
    display: "standalone",
    background_color: "#030816",
    theme_color: "#030816",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
