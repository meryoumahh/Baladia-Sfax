# Baladia - Plateforme de Gestion des Réclamations Municipales

## 📋 Description du Projet

Baladia est une plateforme web complète de gestion des réclamations municipales développée pour faciliter la communication entre les citoyens et l'administration municipale tunisienne. Le système permet aux citoyens de signaler des problèmes d'infrastructure urbaine et aux agents municipaux de traiter efficacement ces réclamations.

## 🏗️ Architecture du Système

### Backend - Django REST Framework

#### Structure des Applications
```
backend/
├── userauth/           # Gestion des utilisateurs et authentification
│   ├── models.py       # CustomUser, CitoyenProfile, AgentProfile
│   ├── serializers.py  # Sérialisation des données utilisateur
│   ├── views.py        # API endpoints pour l'authentification
│   └── urls.py         # Routes d'authentification
├── reclamation/        # Gestion des réclamations
│   ├── models.py       # Modèle Reclamation
│   ├── serializers.py  # Sérialisation des réclamations
│   ├── views.py        # CRUD operations pour réclamations
│   └── urls.py         # Routes des réclamations
└── backend/
    ├── settings.py     # Configuration Django
    └── urls.py         # URLs principales
```

#### Modèles de Données

**CustomUser**
- Système d'authentification personnalisé basé sur l'email
- Rôles: Citoyen, Agent, Admin
- Champs: first_name, last_name, email, telephone, role

**CitoyenProfile**
- Extension du profil citoyen
- Champs: address, dateOfBirth, cin (image), isValid
- Validation par l'administration

**AgentProfile**
- Profil des agents municipaux
- Champs: serviceCategory, plain_password
- 12 catégories de services (Éclairage, Routes, Eau, etc.)

**Reclamation**
- Système de réclamations avec statuts
- Champs: titre, description, category, status, localization, picture
- Statuts: En attente, En cours, Résolu
- Assignment aux agents par l'admin

#### API Endpoints

**Authentification (`/api/auth/`)**
- `POST /login/` - Connexion utilisateur
- `POST /logout/` - Déconnexion
- `GET /user-info/` - Informations utilisateur
- `PATCH /user-info/` - Mise à jour profil
- `POST /citoyen/signup/` - Inscription citoyen
- `POST /agent/signup/` - Création agent (admin)
- `GET /listAgent/` - Liste des agents
- `GET /listCitoyen/` - Liste des citoyens
- `POST /validateCitoyen/<id>/` - Validation citoyen

**Réclamations (`/api/reclamation/`)**
- `POST /create/` - Créer réclamation
- `GET /user-reclamations/` - Réclamations utilisateur
- `GET /agent-reclamation-list/` - Réclamations assignées agent
- `PATCH /status/<id>/` - Mise à jour statut
- `PATCH /assignAgent/<id>/` - Assigner agent
- `GET /stats/` - Statistiques utilisateur
- `POST /validate/<id>/` - Valider réclamation

#### Sécurité et Authentification
- JWT (JSON Web Tokens) avec refresh tokens
- Cookies HTTP-only pour sécurité
- Permissions basées sur les rôles
- Validation des données côté serveur
- CORS configuré pour le frontend

### Frontend - Next.js 14 avec TypeScript

#### Structure des Composants
```
frontend/
├── app/
│   ├── auth/ParentRegister/     # Inscription multi-étapes
│   ├── LandingPage/
│   │   ├── Admin/               # Dashboard administrateur
│   │   ├── Agent/               # Dashboard agent
│   │   └── Citoyen/             # Dashboard citoyen
│   └── utils/
│       ├── auth.tsx             # API calls authentification
│       └── reclamationStats.tsx # Statistiques
├── components/
│   ├── Admindashboard/
│   │   ├── Agents.tsx           # Gestion agents
│   │   └── Citoyens.tsx         # Gestion citoyens
│   ├── Reclamtion/
│   │   ├── ReclamationList.tsx      # Liste réclamations citoyen
│   │   ├── AdminReclamationList.tsx # Liste admin avec assignment
│   │   ├── AgentReclamationList.tsx # Liste agent avec statuts
│   │   ├── FormReclamation.tsx      # Formulaire création
│   │   └── ReclamationCard.tsx      # Carte réclamation
│   └── MainPageCom/
│       └── AuthenticationCom/   # Composants d'authentification
└── public/images/               # Assets statiques
```

#### Fonctionnalités par Rôle

**Citoyen**
- Inscription avec validation CIN
- Création de réclamations avec photos
- Suivi du statut des réclamations
- Tableau de bord avec statistiques
- Gestion du profil personnel

**Agent Municipal**
- Dashboard des réclamations assignées
- Mise à jour des statuts (En cours, Résolu)
- Visualisation des détails et photos
- Gestion du profil professionnel
- Spécialisation par catégorie de service

**Administrateur**
- Gestion complète des utilisateurs
- Validation des comptes citoyens
- Création et gestion des agents
- Assignment des réclamations aux agents
- Vue d'ensemble de toutes les réclamations
- Gestion des mots de passe agents

#### Technologies Frontend
- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styling utilitaire
- **React Icons** - Icônes
- **Axios** - Client HTTP
- **React Hooks** - Gestion d'état

## 🚀 Installation et Configuration

### Prérequis
- Python 3.8+
- Node.js 18+
- SQLite (inclus avec Django)

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### URLs d'accès
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- Admin Django: http://localhost:8000/admin

## 🔧 Configuration

### Variables d'environnement
- `DEBUG=True` (développement)
- `SECRET_KEY` - Clé secrète Django
- `CORS_ALLOWED_ORIGINS` - Origins autorisées

### Base de données
- SQLite pour le développement
- Migrations automatiques pour les modèles
- Données de test via l'admin Django

## 📱 Fonctionnalités Principales

### Gestion des Utilisateurs
- Système d'authentification multi-rôles
- Validation des comptes citoyens par l'admin
- Génération automatique de mots de passe pour agents
- Profils personnalisés par type d'utilisateur

### Système de Réclamations
- Création avec upload d'images
- Catégorisation par type d'infrastructure
- Géolocalisation des problèmes
- Suivi en temps réel des statuts
- Assignment intelligent aux agents spécialisés

### Interface Utilisateur
- Design responsive et moderne
- Tableaux de bord personnalisés
- Navigation intuitive
- Feedback visuel en temps réel
- Support multilingue (français)

## 🏛️ Architecture Technique

### Pattern MVC
- **Models**: Définition des données (Django ORM)
- **Views**: Logique métier (Django REST Views)
- **Controllers**: Gestion des requêtes (React Components)

### Communication API
- REST API avec sérialisation JSON
- Authentification JWT avec refresh tokens
- Gestion d'erreurs centralisée
- Validation côté client et serveur

### Sécurité
- Hachage des mots de passe (Django)
- Tokens JWT sécurisés
- Validation des permissions par rôle
- Protection CSRF
- Upload sécurisé des fichiers

## 🎯 Objectifs du Projet

1. **Digitalisation** des services municipaux
2. **Amélioration** de la communication citoyen-administration
3. **Optimisation** du traitement des réclamations
4. **Transparence** dans le suivi des demandes
5. **Efficacité** opérationnelle pour les agents

## 👥 Équipe de Développement

Projet développé dans le cadre d'un stage d'ingénierie logicielle, démontrant une maîtrise complète du développement full-stack moderne avec Django et Next.js.

---

*Baladia - Connecter les citoyens à leur municipalité* 🏛️