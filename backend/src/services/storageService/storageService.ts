import { supabase } from "@config/supabase/supabase.js";

export const storageService = {
  /**
   * Hàm này nhận file thô (Buffer), tên file, và upload lên Supabase.
   * Sau đó trả về đường link (URL) để lưu vào database.
   */
  async uploadFile(
    fileBuffer: Buffer,
    fileName: string,
    bucketName: string = "images", // Tên bucket mình tạo trên Supabase
    mimeType: string = "image/png"
  ) {
    // 1. Upload file lên Supabase Storage
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, fileBuffer, {
        contentType: mimeType,
        upsert: true, // Cho phép ghi đè nếu trùng tên
      });

    // 2. Nếu upload lỗi thì ném lỗi ra để Controller xử lý
    if (error) {
      console.error("Supabase Upload Error:", error);
      throw new Error("Failed to upload image");
    }

    // 3. Nếu thành công, lấy đường dẫn công khai (Public URL)
    const { data: publicUrlData } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName);

    // 4. Trả về đường dẫn để lưu vào DB
    return publicUrlData.publicUrl;
  },
};
