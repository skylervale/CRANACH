# Use a lighter version of Node as a parent image
FROM mhart/alpine-node
WORKDIR /server
# Copy your code in the docker image
COPY . /server
# Install your project dependencies
RUN npm install --silent \
    && npm install --save-dev nodemon
# Expose the port 3000
EXPOSE 9000
# Set the default command to run when a container starts
RUN npm run build