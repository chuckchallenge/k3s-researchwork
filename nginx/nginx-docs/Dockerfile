FROM nginx:latest

RUN rm -rf /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY html/ /usr/share/nginx/html/

EXPOSE 80