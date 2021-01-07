FROM node:lts-alpine

RUN apk update && apk add bash

# Create app directory
WORKDIR /usr/src/app

COPY ./ ./

RUN npm -g i http-server
RUN npm i

# CMD [ "node", "index.js" ]
