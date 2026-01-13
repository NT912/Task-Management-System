import { v4 as uuidv4 } from "uuid";
import { userRepository } from "@repositories/user/userRepository.js";
import type { UserData } from "@app-types/user.js";
import * as bcrypt from "bcrypt";
import type { RegisterSchema, LoginSchema } from "@shared/schema.js";
import { z } from "zod";
import { sign } from "hono/jwt";


type RegisterInput = z.infer<typeof RegisterSchema>;
type LoginInput = z.infer<typeof LoginSchema>;

export const authService = {
  async registerUser(rawData: RegisterInput) {
    const existingUser = await userRepository.findByEmail(rawData.email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(rawData.password, 10);

    const newUser: UserData = {
      userId: uuidv4(),
      name: rawData.name,
      email: rawData.email,
      password: hashedPassword,
    };

    const createUser = await userRepository.createUser(newUser);
    const { password, ...userWithoutPassword } = createUser;
    return userWithoutPassword;
  },

  async loginUser(rawData: LoginInput) {
    const existingUser = await userRepository.findByEmail(rawData.email);
    if (!existingUser) {
      throw new Error("Invalid Username or Password");
    }

    const isPasswordValid = await bcrypt.compare(
      rawData.password,
      existingUser.password
    );
    if (!isPasswordValid) {
      throw new Error("Invalid Username or Password");
    }

    const payload = {
      sub: existingUser.userId,
      email: existingUser.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60,
    };

    const secret = process.env.JWT_SECRET || "fallback_secret_neu_quen_config";
    const token = await sign(payload, secret);

    const { password, ...userWithoutPassword } = existingUser;

    return {
      user: userWithoutPassword,
      token: token,
    };
  },


};
