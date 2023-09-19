FROM node:18.16-slim

WORKDIR /usr/src/app

# RUN chown node:node ./
# USER node

COPY package*.json ./

# omit installing husky: remove the 'prepare' script in the package.json
# install dependencies including devDependencies, we need those for typescript compile and build
RUN npm pkg delete scripts.prepare && npm ci && npm cache clean --force

COPY src ./src
COPY tsconfig*.json ./
COPY CHANGELOG.md ./
COPY LICENSE ./
COPY README.md ./

RUN npm run build

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV

# install production dependencies only and remove unnecessary dependencies from the previous 'npm ci' step
RUN npm ci --omit=dev --omit=peer && npm cache clean --force

EXPOSE 3000

CMD [ "node", "dist/module/express/express-app.js" ]