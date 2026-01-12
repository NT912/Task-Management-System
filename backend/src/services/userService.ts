import { v4 as uuidv4 } from "uuid";
import { userRepository } from "@repositories/userRepository.js";
import type { UserData } from "@app-types/user.js";
import * as bcrypt from "bcrypt";
import type { RegisterSchema } from "@shared/schema.js"; 
import { z } from "zod";

type RegisterInput = z.infer<typeof RegisterSchema>;

export const userService = {
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
    const {password, ...userWithoutPassword} = createUser;
    return userWithoutPassword;
  },
};
