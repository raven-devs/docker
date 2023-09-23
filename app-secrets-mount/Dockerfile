# docker build . -t app-secrets-mount --secret id=npmrc,src=.npmrc

# When we run the docker build command we will specify command line arguments that define a new secret ID and reference 
# a file as the source of the secret.
# In the Dockerfile, we will add flags to the RUN directive to install the production npm, which mounts the file referred 
# by the secret ID into the target location—the local directory .npmrc file which is where we want it available.
# The .npmrc file is mounted as a secret and is never copied into the Docker image.
# Lastly, let’s not forget to add the .npmrc file to the contents of the .dockerignore file so it doesn’t make it 
# into the image at all, for either the build nor production images.

# --------------> The build image
FROM node:20-alpine AS build
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
RUN --mount=type=secret,mode=0644,id=npmrc,target=/usr/src/app/.npmrc npm ci --only=production

# --------------> The production image
FROM node:20-alpine
ENV NODE_ENV production
USER node
WORKDIR /usr/src/app
COPY --chown=node:node --from=build /usr/src/app/node_modules /usr/src/app/node_modules
COPY --chown=node:node . /usr/src/app
CMD ["node", "server.js"]