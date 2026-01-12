import type { RegisterSchema } from "@shared/schema.js";
import { z } from "zod";
import { userService } from "@services/userService.js";
import type { Context } from "hono";

type RegisterEnv = {
  Variables: {};
  Bindings: {};
};

type RegisterValidation = {
  out: { json: z.infer<typeof RegisterSchema> };
};

export const registerUserHandeler = async (
  c: Context<RegisterEnv, any, RegisterValidation>
) => {
  try {
    const validateData = c.req.valid("json");
    const result = await userService.registerUser(validateData);
    return c.json({ message: "User created successfully", data: result }, 201);
  } catch (error: any) {
    const status = error.message === "User already exists" ? 400 : 500;
    return c.json({ error: error.message }, status);
  }
};
