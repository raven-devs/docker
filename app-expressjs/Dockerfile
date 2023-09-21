### BUILDER
FROM node:18.16-slim as BUILDER

WORKDIR /usr/src/app

COPY package*.json ./

# install all dependencies (we need those for typescript compile and build steps)
RUN npm ci && npm cache clean --force

COPY src ./src
COPY tsconfig*.json ./

RUN npm run build

### APP
FROM node:18.16-slim as APP

# RUN echo DEBUG-1 whoami: $(whoami)

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
ARG WORKDIR=/usr/src/app

WORKDIR $WORKDIR

RUN chown node:node ./

USER node

COPY --chown=node:node package*.json ./

RUN npm ci --production && npm cache clean --force

COPY --chown=node:node CHANGELOG.md ./
COPY --chown=node:node LICENSE ./
COPY --chown=node:node README.md ./
COPY --chown=node:node --from=BUILDER $WORKDIR/dist dist

EXPOSE 3000
CMD ["node", "dist/module/express/express-app.js"]