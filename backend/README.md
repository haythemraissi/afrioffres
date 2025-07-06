# Backend d'Authentification

Ce backend fournit une API REST pour l'authentification et la gestion des utilisateurs.

## 🚀 Démarrage rapide

### Installation des dépendances
```bash
npm install
```

### Configuration
1. Copiez le fichier `.env.example` vers `.env`:
```bash
cp .env.example .env
```

2. Modifiez les variables d'environnement dans `.env` selon vos besoins :
```env
PORT=3001
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=7d
NODE_ENV=development
DATABASE_PATH=./database.sqlite
CORS_ORIGIN=http://localhost:5173
```

### Démarrage du serveur

#### Mode développement (avec rechargement automatique)
```bash
npm run dev
```

#### Mode production
```bash
npm run build
npm start
```

## 📋 API Endpoints

### Routes publiques

#### Enregistrement d'un utilisateur
- **POST** `/api/auth/register`
- **Body:**
```json
{
  "email": "user@example.com",
  "password": "Password123",
  "firstName": "John",
  "lastName": "Doe"
}
```
- **Réponse:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Utilisateur créé avec succès"
}
```

#### Connexion
- **POST** `/api/auth/login`
- **Body:**
```json
{
  "email": "user@example.com",
  "password": "Password123"
}
```
- **Réponse:** Même format que l'enregistrement

### Routes protégées (nécessitent un token JWT)

#### Informations de l'utilisateur connecté
- **GET** `/api/auth/me`
- **Headers:** `Authorization: Bearer <token>`
- **Réponse:**
```json
{
  "success": true,
  "data": {
    "user": {
      "userId": 1,
      "email": "user@example.com"
    }
  },
  "message": "Informations utilisateur récupérées"
}
```

#### Changement de mot de passe
- **POST** `/api/auth/change-password`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
```json
{
  "oldPassword": "Password123",
  "newPassword": "NewPassword123"
}
```

### Utilitaires

#### Santé du serveur
- **GET** `/api/health`
- **Réponse:**
```json
{
  "success": true,
  "message": "Serveur en fonctionnement",
  "timestamp": "2025-01-01T00:00:00.000Z",
  "uptime": 123.456
}
```

## 🔒 Sécurité

- Les mots de passe sont hachés avec bcrypt (12 rounds)
- Les tokens JWT expirent après 7 jours par défaut
- CORS configuré pour le frontend (port 5173 par défaut)
- Middleware de sécurité avec Helmet
- Validation des données avec Zod

## 🗄️ Base de données

Le backend utilise SQLite avec better-sqlite3 pour la simplicité. La base de données est automatiquement créée au démarrage du serveur.

### Schema de la table users
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  firstName TEXT NOT NULL,
  lastName TEXT NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🛠️ Scripts disponibles

- `npm run dev` : Démarre le serveur en mode développement avec rechargement automatique
- `npm run build` : Compile le TypeScript en JavaScript
- `npm start` : Démarre le serveur en mode production
- `npm run db:migrate` : Exécute les migrations de base de données

## 🧪 Test des endpoints

### Exemples avec curl

#### Enregistrement
```bash
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

#### Connexion
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Password123"
  }'
```

#### Test avec token
```bash
curl -X GET http://localhost:3001/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 🏗️ Architecture

```
backend/
├── src/
│   ├── controllers/     # Contrôleurs des routes
│   ├── db/             # Configuration base de données
│   ├── middleware/     # Middlewares Express
│   ├── models/         # Modèles de données
│   ├── routes/         # Définition des routes
│   ├── schemas/        # Schémas de validation Zod
│   ├── services/       # Logique métier
│   ├── types/          # Types TypeScript
│   └── index.ts        # Point d'entrée de l'application
├── .env                # Variables d'environnement
├── package.json
└── tsconfig.json
```

## 🔧 Technologies utilisées

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **TypeScript** - Langage typé
- **SQLite + better-sqlite3** - Base de données
- **bcryptjs** - Hachage des mots de passe
- **jsonwebtoken** - Authentification JWT
- **Zod** - Validation des données
- **CORS** - Gestion des requêtes cross-origin
- **Helmet** - Sécurité HTTP
- **tsx** - Exécution TypeScript directe