# STAGE build
FROM node:18.16-slim as build
ARG NPM_TOKEN
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/

# create the '.npmrc' file, update it, install dependencies and delete the file
# the NPM_TOKEN is not exposed as this is the intermediate step and it is not logged in the docker history
RUN echo "//registry.npmjs.org/:_authToken=$NPM_TOKEN" > .npmrc && \
  npm ci --only=production && \
  rm -f .npmrc
# ...

# STAGE app
FROM node:18.16-slim as app
# ...
