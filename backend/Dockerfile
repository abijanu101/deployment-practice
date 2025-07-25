FROM node:latest

COPY package.json /app/
COPY index.js /app/
COPY db.js /app/
COPY models /app/models

WORKDIR /app

RUN npm i
CMD ["npm", "run", "dev"]