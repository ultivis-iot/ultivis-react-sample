import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const baseUrl = env.VITE_BASE_URL;
  const httpProxyTarget = `https://${env.VITE_PROXY}`;
  const wsProxyTarget = `ws://${env.VITE_PROXY}`;

  return {
    base: baseUrl,
    plugins: [react()],
    resolve: {
      alias: {
        "@ultivis/library": resolve(
          __dirname,
          "./library/ultivis-react-library.es"
        ),
        "@ultivis/style": resolve(__dirname, "./library/index.css"),
      },
    },
    server: {
      host: "0.0.0.0",
      port: 5173,
      proxy: {
        "/notification/realtime": {
          target: wsProxyTarget,
          ws: true,
        },
        "^/": {
          target: httpProxyTarget,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\//, ""),
          configure: (proxy, options) => {
            proxy.on("proxyReq", (proxyReq, req, res) => {
              proxyReq.setHeader("origin", httpProxyTarget);
            });
          },
          bypass: (req, res, proxyOptions) => {
            if (req.url === "/" || req.url.startsWith("/apps")) {
              return req.url;
            }
            return null;
          },
        },
      },
    },
  };
});
