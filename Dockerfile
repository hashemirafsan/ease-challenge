FROM node:18.16.0-alpine

WORKDIR /usr/src/app
COPY package*.json ./
COPY yarn.lock ./
# Install deps
RUN yarn install

COPY . .

EXPOSE 3001