# STAGE: BASE
FROM node:18.16-slim as base
WORKDIR /usr/src/app
RUN chown node:node ./
USER node
COPY --chown=node:node package*.json ./
RUN npm ci && npm cache clean --force
COPY --chown=node:node src ./src
COPY --chown=node:node tsconfig*.json ./
RUN npm run build

# STAGE: APP
FROM node:18.16-slim as app
LABEL version="0.1.0" maintainer="Sergey Petushkou sergey.petushkou@ravendevs.com"
# RUN echo DEBUG-1 whoami: $(whoami)
ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
ARG WORKDIR=/usr/src/app
WORKDIR $WORKDIR
RUN chown node:node ./
USER node
COPY --chown=node:node package*.json ./
RUN npm ci --only=production && npm cache clean --force
COPY --chown=node:node CHANGELOG.md ./
COPY --chown=node:node LICENSE ./
COPY --chown=node:node README.md ./
COPY --chown=node:node --from=base $WORKDIR/dist dist
EXPOSE 3000
CMD ["node", "dist/module/express/express-app.js"]