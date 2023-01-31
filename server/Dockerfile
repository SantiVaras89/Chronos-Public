# Build app
FROM node:19.0.0-alpine as build

WORKDIR /usr/app
COPY . /usr/app

RUN npm install
RUN npm run build

# Production Image
FROM node:19.0.0-alpine

WORKDIR /usr/app

COPY package.json .
COPY --from=build /usr/app/build /usr/app/build

EXPOSE 9000

ENV NODE_ENV='production'
ENV TZ=America/Argentina/Buenos_Aires

RUN apk add curl
RUN apk add tzdata
RUN npm install

ENTRYPOINT [ "npm", "run", "start" ]