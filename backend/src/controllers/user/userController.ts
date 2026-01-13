import type { Context } from "hono";
import { storageService } from "@services/storageService/storageService.js";
// import { userService } from "@services/userService.js"; // Sau này sẽ dùng

export const uploadAvatar = async (c: Context) => {
  try {
    // 1. Lấy dữ liệu form gửi lên
    const body = await c.req.parseBody();
    const file = body["avatar"]; // 'avatar' là key form-data

    // Kiểm tra xem có phải là File không
    // Lưu ý: Hono xử lý File upload hơi khác node thường 1 chút, file sẽ có dạng File object
    if (!file || !(file instanceof File)) {
      return c.json({ error: "No file uploaded or invalid file" }, 400);
    }

    // 2. Chuyển đổi File sang dạng Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // 3. Tạo tên file độc nhất: timestamp-filename
    const fileName = `avatar-${Date.now()}-${file.name}`;

    // 4. Upload lên Supabase
    const imageUrl = await storageService.uploadFile(
      buffer,
      fileName,
      "images", // Tên bucket
      file.type || "image/png"
    );

    // TODO: 5. Lưu imageUrl vào DB (sẽ làm sau bước này)
    // await userService.updateAvatar(userId, imageUrl);

    return c.json({
      message: "Upload successful",
      data: { url: imageUrl },
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return c.json({ error: "Upload failed" }, 500);
  }
};
