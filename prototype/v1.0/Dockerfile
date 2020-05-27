FROM node:lts-alpine

# install simple http server for serving static content
RUN npm install -g http-server

WORKDIR /usr/src/cranachTimline

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./

# install project dependencies
RUN npm install

# Bundle app source
COPY . .

# build app for production with minification
RUN npm run build

EXPOSE 8080
CMD [ "http-server", "dist" ]
