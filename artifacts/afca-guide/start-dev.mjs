import { createServer } from "vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

process.env.CI = "true";

const server = await createServer({
  configFile: resolve(__dirname, "vite.config.ts"),
  root: __dirname,
});

await server.listen();
server.printUrls();

process.stdin.resume();
setInterval(() => {}, 1 << 30);

process.removeAllListeners("SIGTERM");
process.removeAllListeners("SIGINT");

const shutdown = async () => {
  await server.close();
  process.exit(0);
};
process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
