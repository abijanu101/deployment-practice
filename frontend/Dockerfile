FROM node:latest

WORKDIR /app/

COPY eslint.config.js ./
COPY index.html ./
COPY package.json ./
COPY vite.config.js ./
COPY src ./src/


RUN npm i
CMD ["npm", "run", "dev"]