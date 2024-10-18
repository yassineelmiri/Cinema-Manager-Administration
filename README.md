# CinéManager - Manager Administration

![CinéManager Image](https://github.com/user-attachments/assets/a540df9a-952a-4329-8f41-57eb6084cfc9)

## Aperçu du projet

**CinéManager** est une application complète pour la gestion de cinéma. Elle permet aux utilisateurs de s'inscrire, de réserver des séances de cinéma, et de consulter les films disponibles. L'interface d'administration permet de gérer les films, les utilisateurs et les réservations, facilitant ainsi le travail des gestionnaires de cinéma.

### Démo du design sur Figma
- [Figma Design](https://www.figma.com/design/gEES0qakbAB2CK2GGy5UHB/Untitled?node-id=0-1&t=uETqtg9sikmWvEtq-1)

![Figma Image](https://github.com/user-attachments/assets/e803ec04-3fe8-4c01-b600-0c8c2a160377)

### Gestion de projet avec JIRA
- [JIRA Board](https://yassine019.atlassian.net/jira/core/projects/POR/list)

![JIRA Image](https://github.com/user-attachments/assets/778bffbd-0a7a-4fda-bb70-44fd1ca5d41e)

## Fonctionnalités principales

- **Authentification sécurisée** : inscription, connexion avec gestion des tokens JWT.
- **Réinitialisation de mot de passe** : via un lien sécurisé par email.
- **Gestion des réservations** : sélection et réservation de séances de cinéma.
- **Catalogue des films** : visualisation et filtrage des films par genre ou date.
- **Tableau de bord administrateur** : gestion des utilisateurs, films et réservations.

## Prérequis

Avant de commencer, assurez-vous d'avoir les outils suivants installés :

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (pour la gestion de conteneurs)

## Installation du projet

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/yassineelmiri/Cin-Manager.git
   cd Cin-Manager
   ```

2. Installez les dépendances du projet :
   ```bash
   npm install
   ```
   ou
   ```bash
   yarn install
   ```

## Lancer le projet en mode développement

Pour démarrer l'application en local, exécutez la commande suivante :

```bash
npm start
```
ou
```bash
yarn start
```

L'application sera disponible sur [http://localhost:3000](http://localhost:3000).

## Fonctionnalités détaillées

### Inscription et Connexion

- Formulaire d'inscription avec validation frontend.
- Connexion sécurisée avec récupération du jeton JWT depuis le backend.
- Persistance du token dans `localStorage` pour maintenir la session active.

### Réinitialisation de mot de passe

- Système d'envoi d'email pour réinitialiser le mot de passe.
- Page dédiée pour créer un nouveau mot de passe via un lien sécurisé.

### Réservation de séances

- Liste des films et des séances disponibles.
- Interface simple pour réserver une séance et choisir les places.

### Gestion des films et utilisateurs (administration)

- Tableau de bord pour l'administration : gestion des films et des réservations.
- Filtrage par genre, année, et date pour afficher les films selon les préférences.

## Dockerisation avec Docker Compose

1. Construisez les images Docker du projet :
   ```bash
   docker-compose build
   ```

2. Démarrez les conteneurs :
   ```bash
   docker-compose up
   ```

L'application sera accessible à [http://localhost:3000](http://localhost:3000).

## Technologies utilisées

- **Frontend** : React, React Router pour la navigation, Axios pour les requêtes HTTP.
- **Backend** : Node.js, Express, MongoDB pour la base de données.
- **Authentification** : JSON Web Tokens (JWT).
- **Docker** : Pour déployer l'application dans des conteneurs.

## Objectifs du projet

1. Concevoir une solution pour la gestion complète des opérations de cinéma.
2. Implémenter une architecture scalable et sécurisée.
3. Utiliser Docker pour faciliter le déploiement.
4. Documenter l'ensemble du projet via Swagger et un fichier README complet.

## Contribution

Les contributions sont encouragées ! Voici comment vous pouvez participer :

1. **Fork** le projet
2. Créez une branche dédiée à votre fonctionnalité (`git checkout -b feature/NouvelleFonctionnalite`)
3. Effectuez vos changements et commitez-les (`git commit -m 'Ajout de nouvelle fonctionnalité'`)
4. Poussez vos changements (`git push origin feature/NouvelleFonctionnalite`)
5. Soumettez une **Pull Request**
