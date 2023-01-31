# Build app
FROM node:19.0.0-alpine as build

WORKDIR /usr/app
COPY . /usr/app

RUN yarn install
RUN npm run build

# Serve app
FROM nginx:1.23.1-alpine

#timezone arg
ENV TZ=America/Argentina/Buenos_Aires
RUN apk add tzdata
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

EXPOSE 80

COPY ./nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/app/build /usr/share/nginx/html
