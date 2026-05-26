FROM node:20-alpine

ENV TZ=America/Sao_Paulo
RUN apk add --no-cache tzdata

WORKDIR /app

COPY package*.json yarn.lock ./
RUN yarn install --network-timeout 600000
COPY . .
RUN yarn build

EXPOSE 8080
CMD ["yarn", "start:prod"]
