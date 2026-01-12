import type { RegisterSchema, LoginSchema } from "@shared/schema.js";
import { z } from "zod";
import { userService } from "@services/userService.js";
import type { Context } from "hono";

type RegisterEnv = {
  Variables: {};
  Bindings: {};
};

type LoginEnv = {
  Variables: {};
  Bindings: {};
};

type RegisterValidation = {
  out: { json: z.infer<typeof RegisterSchema> };
};

type LoginValidation = {
  out: { json: z.infer<typeof LoginSchema> };
};

export const registerUserController = async (
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

export const loginUserController = async (
  c: Context<LoginEnv, any, LoginValidation>
) => {
  try {
    const validateData = c.req.valid("json");
    const { user, token } = await userService.loginUser(validateData);
    return c.json({ message: "Login Successful", data: { user, token } });
  } catch (error: any) {
    const status = error.message === "Invalid Username or Password" ? 401 : 500;
    return c.json({ error: error.message }, status);
  }
};
