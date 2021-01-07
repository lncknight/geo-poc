FROM node:12.20.1-alpine3.12

RUN apk update && apk add bash

# Create app directory
WORKDIR /usr/src/app

COPY ./ ./

RUN npm -g i http-server
RUN npm i

# CMD [ "node", "index.js" ]
