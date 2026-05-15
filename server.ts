import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // MCP Endpoint
  app.get("/api/mcp", (req: Request, res: Response) => {
    res.json({
      protocol: "MCP",
      version: "1.0.0",
      name: "Threadsmithar MCP Endpoint",
      status: "active",
      description: "Active MCP server for Threadsmithar Orchestrator",
      capabilities: ["thread-forging", "narrative-smithing", "story-crafting"],
      timestamp: new Date().toISOString()
    });
  });

  app.post("/api/mcp", (req: Request, res: Response) => {
    try {
      const body = req.body || {};
      const { action, command, params, task } = body;
      const cmd = (action || command || task || "").toLowerCase();

      let result: any = {};

      switch (cmd) {
        case "status":
        case "ping":
          result = { 
            status: "online", 
            agent: "Threadsmithar Orchestrator",
            message: "Forge is hot - Ready to smith threads" 
          };
          break;

        case "execute":
          result = {
            success: true,
            executed: params || command,
            executedAt: new Date().toISOString(),
            message: "Thread successfully forged"
          };
          break;

        case "get_info":
          result = {
            name: "Threadsmithar Orchestrator",
            wallet: "0xe157F1F5e12adB38Ba013683E9Ce24efe21e5bA6",
            platform: "Base",
            version: "1.0.0"
          };
          break;

        default:
          result = {
            success: true,
            message: "Command received",
            data: body
          };
      }

      res.json({
        status: "success",
        agent: "Threadsmithar Orchestrator",
        response: result,
        receivedAt: new Date().toISOString()
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: "Failed to forge the thread"
      });
    }
  });

  // Agent API Endpoint
  app.get("/api/agent", (req: Request, res: Response) => {
    res.json({
      name: "Threadsmithar Orchestrator",
      description: "Master thread forger and narrative smith",
      status: "active",
      wallet: "0xe157F1F5e12adB38Ba013683E9Ce24efe21e5bA6",
      platform: "Threadsmithar",
      version: "1.0.0",
      type: "ERC-8004 Agent",
      lastUpdated: new Date().toISOString()
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Serve index.html for unknown routes (SPA fallback)
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
