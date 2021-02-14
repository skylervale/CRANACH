FROM node:lts-alpine3.13 AS build
WORKDIR /client
# Copy your code in the docker image
COPY . /client
# Install your project dependencies
RUN npm install --legacy-peer-deps --silent
# Expose the port 3000
EXPOSE 3000
# Set the default command to run when a container starts
RUN npm run build


FROM nginx:latest AS nginx
WORKDIR /usr/share/nginx/html
COPY --from=build /client/build .

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]