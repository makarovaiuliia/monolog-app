import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "monolog app",
    short_name: "monolog",
    description:
      "monolog is an app for keeping a personal diary and mood logging. Share you thoughts, pain, happiness and sadness with us",
    start_url: "/",
    display: "standalone",
    background_color: "#BCCEEC",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/icon_192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon_512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
