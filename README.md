# Application Web CRUD 

Application web complète avec frontend, backend Java et base de données pour la gestion des utilisateurs.

## Description

Ce projet consiste en une application web complète permettant d'effectuer des opérations CRUD sur une table "USER" avec :
- **Frontend** : Interface utilisateur en React 
- **Backend** : API Java avec Spring 
- **Base de données** : Schéma BDD 
- **Infrastructure** : Conteneurisée avec Docker

## Fonctionnalités

### Frontend
- Page listant tous les utilisateurs
- Bouton "+" pour créer un nouvel utilisateur
- Affichage du détail au clic sur un élément
- Bouton "modifier" pour éditer les données

### Backend
- API REST complète (CRUD)
- Architecture en couches (Controller → Service → DAO)
- DAO bouchonné pour le développement
- Gestion des exceptions et logs

## Technologies

- **Frontend** : React 
- **Backend** : Java Spring 
- **Base de données** : MySQ
- **Reverse Proxy** : Nginx
- **Conteneurisation** : Docker & Docker Compose
- **Gestion de version** : Git

## Installation et Déploiement

### Prérequis
- Docker
- Docker Compose
- Git

### Déploiement

1. **Cloner le repository**
   ```bash
   git clone <url-du-repository>
   cd <nom-du-projet>
