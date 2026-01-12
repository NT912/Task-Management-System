import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

// Tạo một "Pool" kết nối để tối ưu hiệu suất (tái sử dụng các kết nối thay vì tạo mới liên tục)
export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});