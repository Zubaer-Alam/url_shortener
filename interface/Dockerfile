FROM node:18-slim

WORKDIR /app

COPY package*.json .

RUN npm i

COPY . .

EXPOSE 8080

CMD npm start -- --host=0.0.0.0