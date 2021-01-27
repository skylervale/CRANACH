FROM nginx:latest

RUN apt-get update && apt-get install --no-install-recommends --no-install-suggests -y \
        openssl \
        vim \
    && rm -rf /var/lib/apt/lists/*

RUN apt-get update -qq && \
    apt-get install software-properties-common -y



ADD nginx.conf /etc/nginx/
ADD default.conf /etc/nginx/conf.d/default.conf

RUN echo "upstream php-upstream { server app:9000; }" > /etc/nginx/conf.d/upstream.conf
CMD ["nginx", "-g", "daemon off;"]