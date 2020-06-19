# Use a lighter version of Node as a parent image
FROM mhart/alpine-node:latest
# Set the working directory to /client
WORKDIR /client
# copy package.json into the container at /client
COPY package*.json /client/
# install dependencies
RUN npm install
# Copy the current directory contents into the container at /client
COPY ./ /client/

# Run the app when the container launches
CMD ["npm", "start"]