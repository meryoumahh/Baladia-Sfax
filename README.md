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
- **PostgreSQL 12+** (remplace SQLite)
- psycopg2-binary (driver PostgreSQL)

### Backend Setup
```bash
cd backend
pip install -r requirements.txt

# Configuration PostgreSQL requise avant migration
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
- **PostgreSQL** pour le développement et production
- **SQLite** (ancienne configuration, migrée vers PostgreSQL)
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

## 🗄️ Configuration Base de Données PostgreSQL

### **Migration SQLite vers PostgreSQL**

#### **Étape 1: Installation PostgreSQL**
```bash
# Windows - Télécharger depuis https://www.postgresql.org/download/windows/
# Installer avec les paramètres par défaut
# Noter le mot de passe du superutilisateur postgres
```

#### **Étape 2: Installation du Driver Python**
```bash
cd backend
pip install psycopg2-binary
pip install python-decouple  # Pour les variables d'environnement
```

#### **Étape 3: Création de la Base de Données**
```sql
-- Se connecter à PostgreSQL
psql -U postgres

-- Créer la base de données
CREATE DATABASE "BaladiaSfax";

-- Créer un utilisateur dédié (optionnel)
CREATE USER baladia_user WITH PASSWORD 'votre_mot_de_passe';
GRANT ALL PRIVILEGES ON DATABASE "BaladiaSfax" TO baladia_user;

-- Quitter
\q
```

#### **Étape 4: Configuration Django**

**Variables d'Environnement (.env dans backend/)**:
```bash
DB_NAME=BaladiaSfax
DB_USER=postgres
DB_PASSWORD=votre_mot_de_passe
DB_HOST=localhost
DB_PORT=5432
```

**Configuration settings.py**:
```python
from decouple import config

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DB_NAME'),
        'USER': config('DB_USER'),
        'PASSWORD': config('DB_PASSWORD'),
        'HOST': config('DB_HOST'),
        'PORT': config('DB_PORT'),
    }
}
```

#### **Étape 5: Migration des Données**
```bash
# Option A: Migration propre (recommandée)
python manage.py migrate
python manage.py createsuperuser

# Option B: Transfert depuis SQLite (si données existantes)
python manage.py dumpdata --natural-foreign --natural-primary -e contenttypes -e auth.Permission > backup.json
# Changer la configuration vers PostgreSQL
python manage.py migrate
python manage.py loaddata backup.json
```

### **Avantages PostgreSQL vs SQLite**

| Aspect | SQLite | PostgreSQL |
|--------|--------|------------|
| **Performance** | Limitée pour concurrent | Excellente pour concurrent |
| **Scalabilité** | Fichier unique | Millions d'enregistrements |
| **Fonctionnalités** | Basiques | Avancées (JSON, Arrays, Full-text) |
| **Production** | Non recommandé | Prêt pour production |
| **Backup** | Copie de fichier | Outils professionnels |
| **Sécurité** | Limitée | Robuste avec SSL |

### **Commandes PostgreSQL Utiles**
```bash
# Connexion à la base
psql -U postgres -d BaladiaSfax

# Commandes psql
\l          # Lister les bases de données
\dt         # Lister les tables
\d table    # Décrire une table
\q          # Quitter

# Backup/Restore
pg_dump -U postgres BaladiaSfax > backup.sql
psql -U postgres BaladiaSfax < backup.sql
```

## 📊 Détails des Migrations Django

### **Structure des Migrations (37 migrations totales)**

#### **Applications Django Standard (31 migrations)**

**admin (3 migrations)**:
- `0001_initial` - Tables d'administration Django
- `0002_logentry_remove_auto_add` - Amélioration des logs
- `0003_logentry_add_action_flag_choices` - Choix d'actions

**auth (12 migrations)**:
- `0001_initial` - Système d'authentification de base
- `0002_alter_permission_name_max_length` - Longueur des permissions
- `0003_alter_user_email_max_length` - Longueur email utilisateur
- `0004_alter_user_username_opts` - Options nom d'utilisateur
- `0005_alter_user_last_login_null` - Dernière connexion nullable
- `0006_require_contenttypes_0002` - Dépendance contenttypes
- `0007_alter_validators_add_error_messages` - Messages d'erreur
- `0008_alter_user_username_max_length` - Longueur nom d'utilisateur
- `0009_alter_user_last_name_max_length` - Longueur nom de famille
- `0010_alter_group_name_max_length` - Longueur nom de groupe
- `0011_update_proxy_permissions` - Permissions proxy
- `0012_alter_user_first_name_max_length` - Longueur prénom

**contenttypes (2 migrations)**:
- `0001_initial` - Types de contenu Django
- `0002_remove_content_type_name` - Suppression nom type contenu

**sessions (1 migration)**:
- `0001_initial` - Gestion des sessions utilisateur

**token_blacklist (13 migrations)**:
- `0001_initial` - Système de blacklist JWT initial
- `0002_outstandingtoken_jti_hex` - Token JTI hexadécimal
- `0003_auto_20171017_2007` à `0013_alter_blacklistedtoken_options_and_more` - Évolutions JWT

#### **Applications Personnalisées Baladia (6 migrations)**

**userauth (6 migrations)**:
- `0001_initial` - **Modèle CustomUser initial**
  - Création du système d'authentification personnalisé
  - Rôles: Citoyen, Agent, Admin
  - Champs: first_name, last_name, email, role

- `0002_customuser_telephone` - **Ajout du téléphone**
  - Ajout du champ telephone au modèle CustomUser
  - Permet la communication directe avec les utilisateurs

- `0003_remove_citoyenprofile_telephone_and_more` - **Refactoring des profils**
  - Suppression du téléphone du CitoyenProfile
  - Centralisation dans CustomUser
  - Création des modèles CitoyenProfile et AgentProfile

- `0004_alter_customuser_role` - **Amélioration des rôles**
  - Modification des choix de rôles utilisateur
  - Standardisation des permissions

- `0005_alter_agentprofile_servicecategory` - **Catégories de service**
  - Définition des 12 catégories de services municipaux
  - Spécialisation des agents par domaine

- `0006_agentprofile_plain_password` - **Mots de passe agents**
  - Ajout du stockage temporaire des mots de passe
  - ⚠️ **Problème de sécurité identifié**

**reclamation (2 migrations)**:
- `0001_initial` - **Système de réclamations**
  - Création du modèle Reclamation
  - Champs: titre, description, category, status, localization
  - Relation avec CustomUser (créateur)

- `0002_reclamation_validate_alter_reclamation_category_and_more` - **Validation et améliorations**
  - Ajout du champ validate (validation admin)
  - Amélioration des catégories de réclamations
  - Ajout de l'assignment aux agents
  - Support des images (picture)

### **Tables Créées (≈15 tables)**

#### **Tables Système Django (≈11 tables)**:
- `django_migrations` - Historique des migrations
- `django_admin_log` - Logs d'administration
- `django_content_type` - Types de contenu
- `django_session` - Sessions utilisateur
- `auth_user`, `auth_group`, `auth_permission` - Authentification
- `auth_group_permissions`, `auth_user_groups`, `auth_user_user_permissions` - Relations
- `token_blacklist_outstandingtoken`, `token_blacklist_blacklistedtoken` - JWT

#### **Tables Métier Baladia (4 tables)**:
- **`userauth_customuser`** - Utilisateurs (Citoyen/Agent/Admin)
- **`userauth_citoyenprofile`** - Profils citoyens avec CIN et validation
- **`userauth_agentprofile`** - Profils agents avec catégories et mots de passe
- **`reclamation_reclamation`** - Réclamations municipales avec statuts

### **Évolution du Projet (Chronologie)**

1. **Phase 1** - Architecture de base (0001_initial)
2. **Phase 2** - Communication utilisateur (ajout téléphone)
3. **Phase 3** - Séparation des responsabilités (profils séparés)
4. **Phase 4** - Amélioration de la sécurité (rôles)
5. **Phase 5** - Spécialisation métier (catégories agents)
6. **Phase 6** - Gestion des mots de passe (problème de sécurité)
7. **Phase 7** - Validation et assignment (réclamations complètes)

## 🎯 Objectifs du Projet

1. **Digitalisation** des services municipaux
2. **Amélioration** de la communication citoyen-administration
3. **Optimisation** du traitement des réclamations
4. **Transparence** dans le suivi des demandes
5. **Efficacité** opérationnelle pour les agents

## 🔧 Améliorations de Sécurité et Refactoring

### ✅ **Améliorations Implémentées**

#### **Sécurité Backend**
- **Variables d'Environnement**: Configuration sécurisée des URLs API via `.env.local`
- **Validation Renforcée**: Validation complète des entrées utilisateur avec gestion d'erreurs
- **Codes de Statut HTTP**: Réponses API standardisées avec codes appropriés
- **Logging**: Système de journalisation pour le débogage et la surveillance
- **Validation des Mots de Passe**: Critères de sécurité renforcés (longueur, complexité)
- **Protection des Transactions**: Utilisation de transactions atomiques pour l'intégrité des données

#### **Architecture Frontend**
- **Interfaces TypeScript**: Définitions de types complètes remplaçant les types `any`
- **Couche de Service API**: Centralisation des appels API avec gestion d'erreurs
- **Intercepteurs Axios**: Gestion centralisée des erreurs et redirection automatique
- **Validation des Formulaires**: Amélioration de la validation côté client

#### **Nouvelles Fonctionnalités**
- **Affichage/Masquage des Mots de Passe**: Interface admin avec icônes œil pour les mots de passe agents
- **Réassignation d'Agents**: Possibilité de changer l'agent assigné à une réclamation
- **Profils Éditables**: Modification des profils utilisateur avec validation
- **Persistance de Navigation**: Sauvegarde de l'état de navigation dans localStorage

### 🔄 **Fonctionnalités Partiellement Intégrées**

#### **Système d'Email pour Agents**
**État**: Préparé mais non actif

**Ce qui existe**:
- Utilitaires de génération de mots de passe sécurisés (`utils.py`)
- Fonction d'envoi d'email `send_password_email()`
- Validation de force des mots de passe

**Ce qui manque pour l'activation**:
```python
# Configuration email requise dans settings.py
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = 'votre-email@gmail.com'
EMAIL_HOST_PASSWORD = 'mot-de-passe-app'
DEFAULT_FROM_EMAIL = 'votre-email@gmail.com'
```

**Workflow Actuel**:
```
Admin crée agent → Mot de passe généré → Stocké en base → Affiché dans UI admin
```

**Workflow Sécurisé Proposé**:
```
Admin crée agent → Mot de passe généré → Email envoyé → Pas de stockage en clair
```

### ⚠️ **Problèmes de Sécurité Identifiés**

#### **Critique - À Résoudre**
1. **Stockage en Clair**: Mots de passe agents stockés non chiffrés dans `AgentProfile.plain_password`
2. **Accès Admin**: Administrateurs peuvent voir tous les mots de passe agents
3. **Pas d'Expiration**: Mots de passe sans expiration ni changement forcé
4. **Risque Base de Données**: Compromission = exposition de tous les mots de passe

#### **Recommandations de Sécurité**
1. **Supprimer** le champ `plain_password`
2. **Implémenter** la récupération de mot de passe par email
3. **Forcer** le changement de mot de passe à la première connexion
4. **Ajouter** l'expiration des mots de passe
5. **Configurer** le serveur email pour l'envoi automatique

### 📁 **Nouveaux Fichiers Créés**

```
backend/
└── userauth/
    └── utils.py              # Utilitaires de sécurité et email

frontend/
├── .env.local               # Variables d'environnement
├── types/
│   └── index.ts            # Interfaces TypeScript
└── services/
    └── api.ts              # Couche de service API centralisée
```

### 🔧 **Configuration Requise pour Production**

#### **Variables d'Environnement**
```bash
# Frontend (.env.local)
NEXT_PUBLIC_API_URL=http://localhost:8000/api/auth/
NEXT_PUBLIC_RECLAMATION_API_URL=http://localhost:8000/api/reclamation/

# Backend (settings.py)
EMAIL_BACKEND=django.core.mail.backends.smtp.EmailBackend
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
```

### 📊 **État de Production**

**✅ Prêt pour Production**:
- Authentification JWT sécurisée
- Validation des données renforcée
- Gestion d'erreurs centralisée
- Interface utilisateur complète
- Fonctionnalités métier opérationnelles

**⚠️ Nécessite Configuration**:
- Serveur email pour notifications agents
- Variables d'environnement de production
- Suppression du stockage de mots de passe en clair

**🔴 Risques de Sécurité**:
- Mots de passe agents visibles par admin
- Pas de récupération de mot de passe sécurisée
- Configuration email manquante

### 🎯 **Prochaines Étapes Recommandées**

1. **Immédiat**: Configurer le serveur email
2. **Court terme**: Supprimer le stockage de mots de passe en clair
3. **Moyen terme**: Implémenter la récupération de mot de passe
4. **Long terme**: Ajouter l'authentification à deux facteurs

## 👥 Équipe de Développement

Projet développé dans le cadre d'un stage d'ingénierie logicielle, démontrant une maîtrise complète du développement full-stack moderne avec Django et Next.js, incluant les meilleures pratiques de sécurité et d'architecture.

---

*Baladia - Connecter les citoyens à leur municipalité* 🏛️