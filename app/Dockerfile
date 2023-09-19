# Each command in the Dockerfile becomes a new layer in the image. 
# To minimize the number of layers, you can restructure your Dockerfile to support caching of dependencies. 
# For Node-based applications, those dependencies are defined in the package.json file.
# The approach is to copy only that file in first, install the dependencies, and then copy everything else. 
# The process only recreates the yarn dependencies if there was a change to the package.json.
# Run 'docker build -t getting-started .' couple of times and see output:
#  => CACHED [2/5] WORKDIR /app
#  => CACHED [3/5] COPY package.json yarn.lock ./
#  => CACHED [4/5] RUN yarn install --production

# downloads the specified image and creates a new container based on this image.
FROM node:20-alpine

# install required packages and clean a cache installation
# RUN apk add --no-cache python3 g++ make

# install required packages and clean a cache installation
# RUN npm install typescript@5.0.4 -g

# install required packages and clean a cache installation,
# try to do everything in one RUN step to minimize docker layers
# RUN apt-get update && apt-get install curl -y && apt-get clean

# ARG is for setting environment variables which are used only during the docker build process
# ARG BUILD_TIME=abc

# ENV is for setting environment variables which are used both during the build and during runtime in containers
# ENV RUN_TIME=123

# sets the current working directory in the container, used by the subsequent commands
WORKDIR /app

# default NodeJS images have 'node' user and 'node' group, but it has to be enabled, 
# the best option is to use it before any NPM dependencies or code are added,
# RUN chown node:node ./
# USER node

# copies files from the host computer to the container
COPY package.json yarn.lock ./

# executes a command in the container, arguments to the RUN command are command-line commands
RUN yarn install --production

# .dockerignore files are an easy way to selectively copy only image relevant files
COPY . .

# creates a configuration in the new image that specifies which ports to open when the container runs
EXPOSE 3000

# the CMD directive specifies the default command to run when starting a container from this image
CMD ["node", "/app/src/index.js"]
