import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/User.js';
import { CreateUserInput, LoginInput } from '../schemas/auth.js';
import { AuthResponse, JwtPayload } from '../types/index.js';

export class AuthService {
  private static readonly JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';
  private static readonly JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

  static async register(userData: CreateUserInput): Promise<AuthResponse> {
    // Vérifier si l'email existe déjà
    if (UserModel.emailExists(userData.email)) {
      throw new Error('Un utilisateur avec cet email existe déjà');
    }

    // Hacher le mot de passe
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    // Créer l'utilisateur
    const user = UserModel.create({
      ...userData,
      password: hashedPassword,
    });

    // Générer le token JWT
    const token = this.generateToken(user.id, user.email);

    // Retourner la réponse sans le mot de passe
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }

  static async login(loginData: LoginInput): Promise<AuthResponse> {
    // Trouver l'utilisateur par email
    const user = UserModel.findByEmail(loginData.email);
    if (!user) {
      throw new Error('Email ou mot de passe incorrect');
    }

    // Vérifier le mot de passe
    const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Email ou mot de passe incorrect');
    }

    // Générer le token JWT
    const token = this.generateToken(user.id, user.email);

    // Retourner la réponse sans le mot de passe
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  }

  static generateToken(userId: number, email: string): string {
    const payload: JwtPayload = {
      userId,
      email,
    };

    return jwt.sign(payload, this.JWT_SECRET, {
      expiresIn: this.JWT_EXPIRES_IN,
    });
  }

  static verifyToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, this.JWT_SECRET) as JwtPayload;
    } catch (error) {
      throw new Error('Token invalide');
    }
  }

  static async changePassword(userId: number, oldPassword: string, newPassword: string): Promise<void> {
    const user = UserModel.findById(userId);
    if (!user) {
      throw new Error('Utilisateur non trouvé');
    }

    // Vérifier l'ancien mot de passe
    const isOldPasswordValid = await bcrypt.compare(oldPassword, user.password);
    if (!isOldPasswordValid) {
      throw new Error('Ancien mot de passe incorrect');
    }

    // Hacher le nouveau mot de passe
    const saltRounds = 12;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Mettre à jour le mot de passe
    UserModel.update(userId, { password: hashedNewPassword });
  }
}