import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import { defineConfig } from "astro/config";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  site: "https://trueberryless-org.trueberryless.org",
  build: {
    inlineStylesheets: "always",
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [
    icon({
      iconDir: path.resolve(__dirname, "src/icons"),
      svgoOptions: {
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                cleanupIDs: false,
              },
            },
          },
        ],
      },
    }),
    sitemap(),
  ],
  vite: {
    css: {
      devSourcemap: true,
      transformer: "lightningcss",
    },
    build: {
      cssMinify: "lightningcss",
    },
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, "src/components"),
        "@core-elements": path.resolve(__dirname, "src/components/building-blocks/core-elements"),
        "@wrappers": path.resolve(__dirname, "src/components/building-blocks/wrappers"),
        "@navigation": path.resolve(__dirname, "src/components/navigation"),
        "@page-sections": path.resolve(__dirname, "src/components/page-sections"),
        "@builders": path.resolve(__dirname, "src/components/page-sections/builders"),
        "@data": path.resolve(__dirname, "src/data"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@layouts": path.resolve(__dirname, "src/layouts"),
        "@styles": path.resolve(__dirname, "src/styles"),
      },
    },
  },
});
