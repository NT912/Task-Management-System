import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import userRouter from "./routes/userRoute.js";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), "src/config/env/.env.dev") });

const app = new Hono();

app.use(
  "/*",
  cors({
    origin: "http://localhost:3001",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  })
);

app.route("/api/users", userRouter);

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

serve(
  {
    fetch: app.fetch,
    port: Number(process.env.PORT),
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  }
);
