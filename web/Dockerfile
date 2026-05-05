FROM node:20-alpine as builder

WORKDIR /app

COPY package*.json yarn.lock /app/
RUN yarn install
COPY . /app
RUN yarn build

FROM node:20-alpine

# TIMEZONE
ENV TZ=America/Sao_Paulo
RUN apk add --no-cache tzdata

WORKDIR /app
USER node

COPY --from=builder --chown=node:node /app/package*.json ./
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/dist ./dist

EXPOSE 3000
CMD [ "yarn", "preview", "--host", "0.0.0.0" ,"--port", "3000"]