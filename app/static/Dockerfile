FROM node:10-alpine as builder

WORKDIR /app
ENV NODE_ENV=production
COPY package.json /app
COPY babel.config.js /app
RUN yarn add @vue/cli-plugin-babel @vue/cli-plugin-eslint @vue/cli-service less less-loader vue-template-compiler
RUN yarn install
COPY src/ /app/src
COPY public/ /app/public
RUN yarn run build --mode production

FROM nginx:1.15.5-alpine

COPY conf.d/lisariy.conf /etc/nginx/conf.d/lisariy.conf
COPY --from=builder /app/dist /var/www/lisariy.ru/html/
