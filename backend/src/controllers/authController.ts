import { Request, Response } from 'express';
import { AuthService } from '../services/authService.js';
import { createUserSchema, loginSchema } from '../schemas/auth.js';
import { ApiResponse } from '../types/index.js';
import { ZodError } from 'zod';

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    try {
      // Validation des données d'entrée
      const validatedData = createUserSchema.parse(req.body);

      // Enregistrement de l'utilisateur
      const result = await AuthService.register(validatedData);

      const response: ApiResponse = {
        success: true,
        data: result,
        message: 'Utilisateur créé avec succès'
      };

      res.status(201).json(response);
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement:', error);

      if (error instanceof ZodError) {
        const response: ApiResponse = {
          success: false,
          error: 'Données invalides',
          data: error.errors
        };
        res.status(400).json(response);
        return;
      }

      if (error instanceof Error) {
        const response: ApiResponse = {
          success: false,
          error: error.message
        };

        // Erreur spécifique pour email déjà existant
        if (error.message.includes('existe déjà')) {
          res.status(409).json(response);
          return;
        }

        res.status(400).json(response);
        return;
      }

      const response: ApiResponse = {
        success: false,
        error: 'Erreur interne du serveur'
      };
      res.status(500).json(response);
    }
  }

  static async login(req: Request, res: Response): Promise<void> {
    try {
      // Validation des données d'entrée
      const validatedData = loginSchema.parse(req.body);

      // Connexion de l'utilisateur
      const result = await AuthService.login(validatedData);

      const response: ApiResponse = {
        success: true,
        data: result,
        message: 'Connexion réussie'
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);

      if (error instanceof ZodError) {
        const response: ApiResponse = {
          success: false,
          error: 'Données invalides',
          data: error.errors
        };
        res.status(400).json(response);
        return;
      }

      if (error instanceof Error) {
        const response: ApiResponse = {
          success: false,
          error: error.message
        };
        res.status(401).json(response);
        return;
      }

      const response: ApiResponse = {
        success: false,
        error: 'Erreur interne du serveur'
      };
      res.status(500).json(response);
    }
  }

  static async me(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        const response: ApiResponse = {
          success: false,
          error: 'Utilisateur non authentifié'
        };
        res.status(401).json(response);
        return;
      }

      // Ici vous pouvez récupérer plus d'infos sur l'utilisateur depuis la base
      const response: ApiResponse = {
        success: true,
        data: { user: req.user },
        message: 'Informations utilisateur récupérées'
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);

      const response: ApiResponse = {
        success: false,
        error: 'Erreur interne du serveur'
      };
      res.status(500).json(response);
    }
  }

  static async changePassword(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        const response: ApiResponse = {
          success: false,
          error: 'Utilisateur non authentifié'
        };
        res.status(401).json(response);
        return;
      }

      const { oldPassword, newPassword } = req.body;

      if (!oldPassword || !newPassword) {
        const response: ApiResponse = {
          success: false,
          error: 'Ancien et nouveau mot de passe requis'
        };
        res.status(400).json(response);
        return;
      }

      await AuthService.changePassword(userId, oldPassword, newPassword);

      const response: ApiResponse = {
        success: true,
        message: 'Mot de passe modifié avec succès'
      };

      res.status(200).json(response);
    } catch (error) {
      console.error('Erreur lors du changement de mot de passe:', error);

      if (error instanceof Error) {
        const response: ApiResponse = {
          success: false,
          error: error.message
        };
        res.status(400).json(response);
        return;
      }

      const response: ApiResponse = {
        success: false,
        error: 'Erreur interne du serveur'
      };
      res.status(500).json(response);
    }
  }
}