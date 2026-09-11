import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "알고가요",
    short_name: "알고가요",
    description: "읽고 바로 써먹는 생활 가이드",
    start_url: "/",
    display: "standalone",
    background_color: "#fffdf8",
    theme_color: "#14213d",
    lang: "ko",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-512-maskable.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
