import { storageService } from "@services/storageService/storageService.js";
import { userRepository } from "@repositories/user/userRepository.js";

export const userService = {
  async changeUserAvatar(userId: string, file: File) {
    // 1. Convert file
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = `avatar-${Date.now()}-${file.name}`;

    // 2. Upload
    const imageUrl = await storageService.uploadFile(
      buffer,
      fileName,
      "images",
      file.type || "image/png"
    );

    // 3. Update DB
    await userRepository.updateAvatar(userId, imageUrl);

    return imageUrl;
  },
};
