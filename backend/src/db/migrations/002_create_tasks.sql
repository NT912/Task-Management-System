CREATE TABLE tasks (
  task_id VARCHAR(36) PRIMARY KEY,
  creator_id VARCHAR(36),
  title VARCHAR(255) NOT NULL,
  content TEXT,
  status ENUM('Todo', 'Doing', 'Done') DEFAULT 'Todo',
  priority ENUM('High', 'Medium', 'Low') DEFAULT 'Medium',
  time_start DATETIME,
  time_end DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (creator_id) REFERENCES users(user_id) ON DELETE RESTRICT
);