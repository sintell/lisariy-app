FROM nginx:1.15.5-alpine

COPY conf.d/lisariy.dev.conf /etc/nginx/conf.d/lisariy.dev.conf
RUN mkdir -p /var/www/lisariy.ru/html/
RUN chmod 777 /var/www/lisariy.ru/html/
