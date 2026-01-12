import { pool } from "../db/index.js";
import type { UserData } from "@app-types/user.js";

export const userRepository = {
  async createUser(data: UserData): Promise<void> {
    const query = `INSERT INTO users (user_id, name, display_name, email, password, phone) VALUES (?, ?, ?, ?, ?, ?)`;
    const values = [
      data.userId,
      data.name,
      data.displayName || null,
      data.email,
      data.password,
      data.phone || null,
    ];
    await pool.execute(query, values);
  },

  async findByEmail(email: string): Promise<any> {
    const [rows]: any = await pool.execute(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );
    return rows[0];
  },
};
