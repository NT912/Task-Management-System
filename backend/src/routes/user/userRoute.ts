import { Hono } from "hono";
import { uploadAvatar } from "@controllers/user/userController.js";
import { authMiddleware } from "@middleware/authMiddleware.js";

const userRouter = new Hono();

userRouter.post("/upload-avatar", authMiddleware, uploadAvatar);

export default userRouter;
