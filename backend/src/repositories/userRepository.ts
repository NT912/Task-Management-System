import { pool } from "../db/index.js";
import type { UserData } from "@app-types/user.js";

export const userRepository = {
  async createUser(data: UserData): Promise<UserData> {
    const query = `INSERT INTO users (user_id, name, email, password) VALUES (?, ?, ?, ?)`;
    const values = [
      data.userId,
      data.name,
      data.email,
      data.password,
    ];
    await pool.execute(query, values);
    return data;
  },

  async findByEmail(email: string): Promise<any> {
    const [rows]: any = await pool.execute(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );
    return rows[0];
  },
};
