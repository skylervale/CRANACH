# Use a lighter version of Node as a parent image
FROM mhart/alpine-node
WORKDIR /client
# Copy your code in the docker image
COPY . /client
# Install your project dependencies
#RUN npm install --silent
# Expose the port 3000
EXPOSE 3000
# Set the default command to run when a container starts
CMD ["npm", "start"]
