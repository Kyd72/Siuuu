# Utilisation d'une image de base légère pour Node.js
FROM node:18-alpine AS build

# Définition du répertoire de travail dans le conteneur
WORKDIR /app

# Copie des fichiers package.json et package-lock.json dans le répertoire de travail
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie du reste des fichiers de l'application dans le répertoire de travail
COPY . .

# Construction de l'application Vue.js pour la production
RUN npm run build

# Stage final : Utilisation d'une image légère pour Nginx pour servir l'application construite
FROM nginx:alpine

# Copie des fichiers de l'étape de construction dans le répertoire de base de Nginx pour servir l'application
COPY --from=build /app/dist /usr/share/nginx/html

# Exposition du port 80 pour que l'application puisse être accessible à l'extérieur du conteneur
EXPOSE 80

# Commande pour démarrer Nginx une fois le conteneur lancé
CMD ["nginx", "-g", "daemon off;"]
