FROM node:lts-alpine3.13
WORKDIR /server
# Copy your code in the docker image
COPY . /server
# Install your project dependencies
RUN npm install
# Expose the port 3000
EXPOSE 9000
# Set the default command to run when a container starts
CMD [ "node", "index.js" ]