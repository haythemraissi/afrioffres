import { Router } from 'express';
import { AuthController } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

// Route publique - Enregistrement
router.post('/register', AuthController.register);

// Route publique - Connexion
router.post('/login', AuthController.login);

// Routes protégées
router.get('/me', authenticateToken, AuthController.me);
router.post('/change-password', authenticateToken, AuthController.changePassword);

export default router;