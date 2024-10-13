# Utiliser l'image officielle Node.js
FROM node:18

# Définir le répertoire de travail
WORKDIR /app

# Copier le fichier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le reste du projet dans le conteneur
COPY . .

# Construire le projet React pour la production
RUN npm run build

# Installer un serveur pour servir l'application React
RUN npm install -g serve

# Exposer le port de l'application
EXPOSE 3000

# Commande pour démarrer le serveur
CMD ["serve", "-s", "build"]
