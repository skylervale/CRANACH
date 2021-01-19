
FROM mhart/alpine-node as client
WORKDIR /client

COPY . /client

RUN npm install --silent

EXPOSE 3000

RUN npm build



FROM docker.elastic.co/elasticsearch/elasticsearch:7.8.0 as elasticsearch

ADD elasticsearch.yml config/


FROM mhart/alpine-node as server
WORKDIR /server

COPY . /server

RUN npm install --silent 

EXPOSE 9000

RUN node index.js