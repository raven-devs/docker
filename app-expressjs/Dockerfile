FROM node:18.16-slim

WORKDIR /usr/src/app

# copy package-lock.json and package.json files at first step to enable layers caching
COPY package*.json ./

# omit installing husky: remove the 'prepare' script in the package.json
RUN npm pkg delete scripts.prepare

# install dependencies including devDependencies, we need those for typescript compile and build
RUN npm ci

COPY src/ ./src/
COPY tsconfig*.json ./
COPY CHANGELOG.md ./
COPY LICENSE ./
COPY README.md ./

# typescript compile and build
RUN npm run build

# env variables
ENV NODE_ENV=production

# install production dependencies only and remove unnecessary dependencies from the previous 'npm ci' step
RUN npm ci --omit=dev

EXPOSE 3000

CMD [ "node", "dist/module/express/express-app.js" ]