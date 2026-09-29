FROM node:22-alpine

WORKDIR /app

RUN apk add --no-cache netcat-openbsd

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["sh", "./docker-entrypoint.sh", "npm", "run", "dev"]