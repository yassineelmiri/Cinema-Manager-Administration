# CinéManager - Frontend



## Figma 
- **Lien** : https://www.figma.com/design/gEES0qakbAB2CK2GGy5UHB/Untitled?node-id=0-1&t=uETqtg9sikmWvEtq-1 

![image](https://github.com/user-attachments/assets/e803ec04-3fe8-4c01-b600-0c8c2a160377)

## JIRA
- **Lien** : https://yassine019.atlassian.net/jira/core/projects/POR/list

![image](https://github.com/user-attachments/assets/778bffbd-0a7a-4fda-bb70-44fd1ca5d41e)


## Description du projet

CinéManager est une application de gestion de cinéma permettant aux utilisateurs de s'inscrire, se connecter, réserver des séances, et consulter les films disponibles. Ce projet utilise **React** pour le frontend et est dockerisé pour une facilité de déploiement.

### Fonctionnalités principales :
- **Inscription et connexion** avec gestion des tokens JWT
- **Réinitialisation de mot de passe**
- **Réservation de séances de cinéma**
- **Affichage des films et des réservations**
- **Filtrage des films** par genre ou date
- **Déconnexion**
  
## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (pour la dockerisation)

## Installation

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

## Démarrage en mode développement

Pour lancer l'application en mode développement, exécutez la commande suivante :

```bash
npm start
```
ou
```bash
yarn start
```

L'application sera accessible à l'adresse [http://localhost:3000](http://localhost:3000).

## Fonctionnalités

### Inscription et Connexion
- Formulaire d'inscription avec validation côté frontend.
- Connexion avec récupération du jeton JWT du backend.
- Stockage du token JWT dans les cookies ou le localStorage pour une utilisation future.

### Réinitialisation de mot de passe
- Formulaire pour entrer l'email et recevoir un lien de réinitialisation.
- Page dédiée pour réinitialiser le mot de passe via un lien sécurisé.

### Réservation de séances
- Liste des films et des séances disponibles.
- Possibilité de réserver une séance via l'interface utilisateur.

### Gestion des films
- Affichage des films disponibles avec des filtres pour trier par genre ou date.
- Consultation des réservations effectuées par l'utilisateur.

## Dockerisation avec Docker Compose

### Étapes de dockerisation :

1. Construisez les images Docker :
   ```bash
   docker-compose build
   ```

2. Lancez les conteneurs :
   ```bash
   docker-compose up
   ```

Une fois les conteneurs démarrés, l'application frontend sera accessible via [http://localhost:3000](http://localhost:3000).

## Bibliothèques et outils utilisés

- **React** : Développement de l'interface utilisateur.
- **React Router** : Gestion des routes et de la navigation.
- **Axios** : Requêtes HTTP vers le backend.
- **Formik / React Hook Form** : Gestion des formulaires (optionnel).
- **Docker & Docker Compose** : Dockerisation du projet pour un déploiement simplifié.

## Objectifs du projet

1. Compréhension du projet.
2. Configuration de l'environnement de développement.
3. Création du projet React.
4. Développement des pages et composants React.
5. Communication avec le backend via Axios.
6. Dockerisation pour le déploiement.
7. Documentation et rapport final.

## Contribution

Les contributions sont les bienvenues ! Pour apporter des modifications, veuillez suivre ces étapes :

1. Fork le projet
2. Créez une nouvelle branche (`git checkout -b feature/NouvelleFonctionnalite`)
3. Commitez vos changements (`git commit -m 'Ajout de nouvelle fonctionnalité'`)
4. Poussez sur la branche (`git push origin feature/NouvelleFonctionnalite`)
5. Créez une Pull Request
