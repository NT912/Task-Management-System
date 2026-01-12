import mysql from 'mysql2/promise';
import fs from 'fs/promises';
import path from 'path';

async function runMigrations() {
  const dbConfig = {
    host: 'localhost',
    user: 'root',
    password: 'truongdeptrai',
    database: 'task_management',
    multipleStatements: true
  };

  const connection = await mysql.createConnection(dbConfig);

  try {
    // 1. Tạo bảng migrations nếu chưa có
    await connection.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        file_name VARCHAR(255) NOT NULL,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // 2. Lấy danh sách các file đã chạy từ DB
    const [rows]: any = await connection.query('SELECT file_name FROM migrations');
    const executedFiles = rows.map((r: any) => r.file_name);

    // 3. Đọc thư mục migrations
    const migrationsDir = path.join(__dirname, 'migrations');
    const files = (await fs.readdir(migrationsDir)).filter(f => f.endsWith('.sql')).sort();

    for (const file of files) {
      if (!executedFiles.includes(file)) {
        console.log(`🚀 Đang chạy migration: ${file}...`);
        
        const sql = await fs.readFile(path.join(migrationsDir, file), 'utf8');
        
        // Chạy nội dung SQL và lưu tên file vào bảng migrations
        await connection.query(sql);
        await connection.query('INSERT INTO migrations (file_name) VALUES (?)', [file]);
        
        console.log(`✅ Đã xong: ${file}`);
      }
    }
    
    console.log("🙌 Tất cả migration đã hoàn tất!");
  } catch (err) {
    console.error("❌ Lỗi trong quá trình migration:", err);
  } finally {
    await connection.end();
  }
}

runMigrations();