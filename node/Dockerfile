FROM node:latest

ARG PRODUCTION=true
ARG ROOT_DIRECTORY

RUN mkdir -p $ROOT_DIRECTORY
WORKDIR $ROOT_DIRECTORY

ENV PATH $ROOT_DIRECTORY/node_modules/.bin:$PATH

COPY package.json ./
COPY package*.json ./

RUN npm install -g npm@latest
RUN npm install --production=$PRODUCTION

COPY . ./
 
