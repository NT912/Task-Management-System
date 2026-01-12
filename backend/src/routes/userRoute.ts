import { RegisterSchema } from "@shared/schema.js";
import { Hono } from "hono";
import { registerUserHandeler } from "../controllers/userController.js";
import { zValidator } from "@hono/zod-validator";

const userRouter = new Hono();

const registerValidator = zValidator("json", RegisterSchema, (result, c) => {
  if (!result.success) {
    return c.json(
      {
        success: false,
        error: "Dữ liệu không hợp lệ!",
        details: result.error.flatten(),
      },
      400
    );
  }
})

userRouter.post(
  "/register",
  registerValidator,
  registerUserHandeler
);

export default userRouter;
