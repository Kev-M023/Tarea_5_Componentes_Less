import { defineConfig } from "vite";
import path, { resolve } from "node:path";
import * as glob from "glob";
import Handlebars from "vite-plugin-handlebars";

const __dirname = import.meta.dirname;
const base_path = process.env.DEPLOY_BASE_URL || "./";

function getHtmlEntries() {
  const files = glob.sync("./**/*.html", {
    ignore: ["./dist/**", "./node_modules/**"]
  });
  return Object.fromEntries(
    files.map((file) => [
      file.slice(0, file.length - path.extname(file).length).replace(/^.\//, ""),
      resolve(__dirname, file)
    ])
  );
}

export default defineConfig({
  appType: "mpa",
  base: base_path,
  build: {
    rollupOptions: {
      input: getHtmlEntries()
    }
  },
  plugins: [
    Handlebars({
      partialDirectory: resolve(__dirname, "src/components")
    })
  ]
});
