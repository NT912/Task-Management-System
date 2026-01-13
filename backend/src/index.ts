import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import authRouter from "./routes/auth/authRoute.js";
import userRouter from "./routes/user/userRoute.js";
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

// Route Auth: /api/users/login, /api/users/register (Giữ nguyên prefix /api/users như cũ để đỡ sửa frontend nhiều)
app.route("/api/users", authRouter);
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
