FROM node:20.13.1-alpine3.20

WORKDIR /app
COPY package*.json ./
RUN npm install

WORKDIR /app/client
COPY ./client/package*json ./
RUN npm install

WORKDIR /app
COPY . .
# RUN npm run migrate
RUN npm run compile

WORKDIR /app/client
RUN npm run build

WORKDIR /app

EXPOSE 80
ENV NODE_ENV=production
ENV host="fynder.food"

CMD [ "npm", "start" ]
