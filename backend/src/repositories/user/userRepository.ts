import { pool } from "@db/index.js";
import type { UserData } from "@app-types/user.js";

export const userRepository = {
  async createUser(data: UserData): Promise<UserData> {
    const query = `INSERT INTO users (user_id, name, email, password) VALUES (?, ?, ?, ?)`;
    const values = [data.userId, data.name, data.email, data.password];
    await pool.execute(query, values);
    return data;
  },

  async findByEmail(email: string): Promise<UserData | undefined> {
    const [rows]: any = await pool.execute(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );
    return rows[0];
  },

  async updateAvatar(userId: string, avatarUrl: string): Promise<void> {
    const query = `UPDATE users SET avatar_url = ? WHERE user_id = ?`;
    await pool.execute(query, [avatarUrl, userId]);
  },
};
