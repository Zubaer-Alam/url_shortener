
FROM node:18-slim

WORKDIR /app

COPY package*.json .

RUN npm i

COPY . .

EXPOSE 8000

CMD npm start

