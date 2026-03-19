const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

const watch = process.argv.includes("--watch");

// Build the plugin code (runs in Figma's sandbox)
const codeBuild = esbuild.build({
  entryPoints: ["src/code.ts"],
  bundle: true,
  outfile: "dist/code.js",
  target: "es2020",
  format: "iife",
  ...(watch && { watch: true }),
});

// Copy UI HTML to dist
function copyUI() {
  fs.mkdirSync("dist", { recursive: true });
  fs.copyFileSync("src/ui.html", "dist/ui.html");
}

copyUI();

if (watch) {
  fs.watchFile("src/ui.html", () => {
    copyUI();
    console.log("UI updated");
  });
}

codeBuild.then(() => console.log(watch ? "Watching..." : "Build complete"));
