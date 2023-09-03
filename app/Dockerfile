# Each command in the Dockerfile becomes a new layer in the image. 
# To minimize the number of layers, you can restructure your Dockerfile to support caching of dependencies. 
# For Node-based applications, those dependencies are defined in the package.json file.

# The approach is to copy only that file in first, install the dependencies, and then copy everything else. 
# The process only recreates the yarn dependencies if there was a change to the package.json.

# Run 'docker build --tag spetushkou/getting-started:0.1.0 .' couple of times and see output:
#  => CACHED [2/5] WORKDIR /app
#  => CACHED [3/5] COPY package.json yarn.lock ./
#  => CACHED [4/5] RUN yarn install --production

FROM node:20-alpine
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --production
COPY . .
CMD ["node", "/app/src/index.js"]