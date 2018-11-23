FROM node:10-alpine as builder

WORKDIR /app
ENV NODE_ENV=development
COPY package.json /app
COPY babel.config.js /app
COPY src/ /app/src
RUN yarn install
RUN yarn build

FROM nginx:1.15.5-alpine

COPY conf.d/* /etc/nginx/conf.d/
COPY --from=builder /app/dist /var/www/lisariy.ru/html/
