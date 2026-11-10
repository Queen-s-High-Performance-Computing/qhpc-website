import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Queen's High Performance Computing Club",
    short_name: "QHPC",
    description: "Queen's University High Performance Computing Club",
    start_url: "/",
    display: "standalone",
    background_color: "#0b224c",
    theme_color: "#0b224c",
    icons: [
      {
        src: "/qhpc-icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/qhpc-icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/qhpc-icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/qhpc-icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
