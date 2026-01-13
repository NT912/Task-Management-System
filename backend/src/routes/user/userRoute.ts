import { Hono } from "hono";
import { uploadAvatar } from "@controllers/user/userController.js";

const userRouter = new Hono();

// API Upload Avatar
// Sau này sẽ thêm middleware checkToken ở đây
userRouter.post("/upload-avatar", uploadAvatar);

export default userRouter;
