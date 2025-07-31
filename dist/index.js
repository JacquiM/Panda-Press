// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
marked.setOptions({
  breaks: true,
  gfm: true
});
function createSlug(filename) {
  return filename.replace(".md", "").toLowerCase();
}
async function registerRoutes(app2) {
  app2.get("/api/blog/posts", async (req, res) => {
    try {
      const postsDir = path.join(process.cwd(), "posts");
      try {
        await fs.access(postsDir);
      } catch {
        return res.json([]);
      }
      const files = await fs.readdir(postsDir);
      const markdownFiles = files.filter((file) => file.endsWith(".md"));
      const posts = [];
      for (const file of markdownFiles) {
        const filePath = path.join(postsDir, file);
        const fileContent = await fs.readFile(filePath, "utf-8");
        const { data } = matter(fileContent);
        const slug = createSlug(file);
        posts.push({
          id: slug,
          slug,
          title: data.title || "Untitled",
          excerpt: data.excerpt || "",
          date: data.date || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
          category: data.category || "General",
          author: data.author || "JPanda Solutions",
          readTime: data.readTime || "5 min read"
        });
      }
      posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      res.json(posts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });
  app2.get("/api/blog/posts/:slug", async (req, res) => {
    try {
      const { slug } = req.params;
      const postsDir = path.join(process.cwd(), "posts");
      const filePath = path.join(postsDir, `${slug}.md`);
      try {
        const fileContent = await fs.readFile(filePath, "utf-8");
        const { data, content } = matter(fileContent);
        const htmlContent = await marked(content);
        const post = {
          id: slug,
          slug,
          title: data.title || "Untitled",
          excerpt: data.excerpt || "",
          date: data.date || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
          category: data.category || "General",
          author: data.author || "JPanda Solutions",
          readTime: data.readTime || "5 min read",
          content: htmlContent
        };
        res.json(post);
      } catch (error) {
        res.status(404).json({ error: "Blog post not found" });
      }
    } catch (error) {
      console.error("Error fetching blog post:", error);
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs2 from "fs";
import path3 from "path";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path2 from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default = defineConfig({
  plugins: [
    react(),
    runtimeErrorOverlay(),
    ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
      await import("@replit/vite-plugin-cartographer").then(
        (m) => m.cartographer()
      )
    ] : []
  ],
  resolve: {
    alias: {
      "@": path2.resolve(import.meta.dirname, "client", "src"),
      "@shared": path2.resolve(import.meta.dirname, "shared"),
      "@assets": path2.resolve(import.meta.dirname, "attached_assets")
    }
  },
  root: path2.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path2.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ["**/.*"]
    }
  }
});

// server/vite.ts
import { nanoid } from "nanoid";
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path3.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs2.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path3.resolve(import.meta.dirname, "public");
  if (!fs2.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path3.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path4 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path4.startsWith("/api")) {
      let logLine = `${req.method} ${path4} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
