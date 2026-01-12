import mysql from 'mysql2/promise';

// Tạo một "Pool" kết nối để tối ưu hiệu suất (tái sử dụng các kết nối thay vì tạo mới liên tục)
export const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'truongdeptrai',
  database: 'task_management',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});