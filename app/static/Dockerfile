FROM node:10-alpine as builder

WORKDIR /app
ENV NODE_ENV=production
COPY package.json /app
COPY babel.config.js /app
COPY src/ /app/src
COPY public/ /app/public
RUN yarn install
RUN yarn add @vue/cli-service
RUN yarn run build --mode production

FROM nginx:1.15.5-alpine

COPY conf.d/lisariy.conf /etc/nginx/conf.d/lisariy.conf
COPY --from=builder /app/dist /var/www/lisariy.ru/html/
