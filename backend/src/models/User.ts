import { db } from '../db/database.js';
import { User, CreateUserRequest } from '../types/index.js';

export class UserModel {
  static findByEmail(email: string): User | undefined {
    const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
    return stmt.get(email) as User | undefined;
  }

  static findById(id: number): User | undefined {
    const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
    return stmt.get(id) as User | undefined;
  }

  static create(userData: CreateUserRequest): User {
    const stmt = db.prepare(`
      INSERT INTO users (email, password, firstName, lastName)
      VALUES (?, ?, ?, ?)
    `);
    
    const result = stmt.run(
      userData.email,
      userData.password,
      userData.firstName,
      userData.lastName
    );

    const newUser = this.findById(result.lastInsertRowid as number);
    if (!newUser) {
      throw new Error('Erreur lors de la création de l\'utilisateur');
    }

    return newUser;
  }

  static update(id: number, userData: Partial<Omit<User, 'id' | 'createdAt' | 'updatedAt'>>): User | undefined {
    const fields = Object.keys(userData).map(key => `${key} = ?`).join(', ');
    const values = Object.values(userData);
    
    const stmt = db.prepare(`UPDATE users SET ${fields} WHERE id = ?`);
    stmt.run(...values, id);
    
    return this.findById(id);
  }

  static delete(id: number): boolean {
    const stmt = db.prepare('DELETE FROM users WHERE id = ?');
    const result = stmt.run(id);
    return result.changes > 0;
  }

  static emailExists(email: string): boolean {
    const stmt = db.prepare('SELECT COUNT(*) as count FROM users WHERE email = ?');
    const result = stmt.get(email) as { count: number };
    return result.count > 0;
  }
}