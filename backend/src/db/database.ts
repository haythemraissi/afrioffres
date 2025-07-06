import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = process.env.DATABASE_PATH || path.join(__dirname, '../../database.sqlite');

export const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Initialize database with tables
export const initializeDatabase = () => {
  // Create users table
  const createUsersTable = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      firstName TEXT NOT NULL,
      lastName TEXT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  db.exec(createUsersTable);

  // Create trigger to update updatedAt
  const createUpdateTrigger = `
    CREATE TRIGGER IF NOT EXISTS update_users_updated_at 
      AFTER UPDATE ON users
      FOR EACH ROW
    BEGIN
      UPDATE users SET updatedAt = CURRENT_TIMESTAMP WHERE id = NEW.id;
    END
  `;

  db.exec(createUpdateTrigger);

  console.log('Database initialized successfully');
};

// Gracefully close database connection
process.on('SIGINT', () => {
  db.close();
  process.exit(0);
});