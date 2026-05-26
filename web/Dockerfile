FROM node:22-alpine

ENV TZ=America/Sao_Paulo
RUN apk add --no-cache tzdata

WORKDIR /app

COPY package*.json yarn.lock ./
RUN yarn install --ignore-engines
COPY . .
RUN yarn build

EXPOSE 3000
CMD ["yarn", "preview", "--host", "0.0.0.0", "--port", "3000"]
