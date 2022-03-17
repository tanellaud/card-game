FROM node:14.17.0-alpine

LABEL maintainer="dev@crowdlinker.com"

# Create app directory
WORKDIR /var/www/card-game

# Install app dependencies
COPY package.json package-lock.json ./ 
# For NPM use: `RUN npm ci`
RUN npm i

# Copy important files - Add ormconfig.ts here if using Typeorm
COPY .eslintrc.js nest-cli.json tsconfig.json tsconfig.build.json ./

# Copy env
COPY .env.docker /var/www/backend/.env

# Add storage folder to the container (If you want to add other folder contents to the container)
# ADD storage /var/www/backend/storage

# Entrypoint command - Replace `"yarn"` with `"npm", "run"` if you are using NPM as your package manager.
# You can update this to run other NodeJS apps
CMD [ "npm", "run", "start:dev", "--preserveWatchOutput" ]