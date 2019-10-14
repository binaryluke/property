FROM nginx

COPY nginx.conf /etc/nginx/nginx.conf
COPY build /data/property
