import { verify } from "hono/jwt";
import type { Context, Next } from "hono";

export const authMiddleware = async (c: Context, next: Next) => {
  try {
    // 1. Lấy token từ header "Authorization: Bearer <token>"
    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return c.json({ error: "Unauthorized: Missing Token" }, 401);
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET || "fallback_secret_neu_quen_config";

    // 2. Giải mã token
    const payload = await verify(token, secret);

    // 3. Gắn userId vào biến global của request (`c.set`) để Controller dùng sau này
    // Lưu ý: Cần khai báo type cho biến này nếu muốn chuẩn TS, nhưng tạm thời cứ dùng c.set đã
    c.set("userId", payload.sub);

    await next();
  } catch (error) {
    return c.json({ error: "Unauthorized: Invalid Token" }, 401);
  }
};
