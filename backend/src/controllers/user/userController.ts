import { userService } from "@services/user/userService.js";
import type { Context } from "hono";

export const uploadAvatar = async (c: Context) => {
  const body = await c.req.parseBody();
  const file = body["avatar"];
  const userId = c.get("userId");

  if (!file || !(file instanceof File)) return c.json({ error: "..." }, 400);

  const imageUrl = await userService.changeUserAvatar(userId, file);

  return c.json({ message: "Success", data: { url: imageUrl } });
};
