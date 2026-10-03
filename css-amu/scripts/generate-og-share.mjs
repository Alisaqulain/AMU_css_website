/**
 * Writes public/og-share.png from the app's opengraph-image route.
 * Run after `next build`: node scripts/generate-og-share.mjs
 */
import { spawn } from "node:child_process";
import { createWriteStream } from "node:fs";
import { mkdir } from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outPath = path.join(root, "public", "og-share.png");
const port = 3456;

function waitForServer(ms = 60000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const tick = () => {
      http
        .get(`http://127.0.0.1:${port}/opengraph-image`, (res) => {
          res.resume();
          if (res.statusCode === 200) resolve();
          else if (Date.now() - start > ms) reject(new Error("Server timeout"));
          else setTimeout(tick, 400);
        })
        .on("error", () => {
          if (Date.now() - start > ms) reject(new Error("Server timeout"));
          else setTimeout(tick, 400);
        });
    };
    tick();
  });
}

function downloadOg() {
  return new Promise((resolve, reject) => {
    http
      .get(`http://127.0.0.1:${port}/opengraph-image`, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`OG route returned ${res.statusCode}`));
          return;
        }
        const file = createWriteStream(outPath);
        res.pipe(file);
        file.on("finish", () => file.close(resolve));
        file.on("error", reject);
      })
      .on("error", reject);
  });
}

await mkdir(path.join(root, "public"), { recursive: true });

const server = spawn("npx", ["next", "start", "-p", String(port)], {
  cwd: root,
  shell: true,
  stdio: "ignore",
});

try {
  await waitForServer();
  await downloadOg();
  console.log(`Wrote ${outPath}`);
} finally {
  server.kill("SIGTERM");
}
