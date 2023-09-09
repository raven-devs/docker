# Each command in the Dockerfile becomes a new layer in the image. 
# To minimize the number of layers, you can restructure your Dockerfile to support caching of dependencies. 
# For Node-based applications, those dependencies are defined in the package.json file.

# The approach is to copy only that file in first, install the dependencies, and then copy everything else. 
# The process only recreates the yarn dependencies if there was a change to the package.json.

# Run 'docker build --tag spetushkou/getting-started:0.1.0 .' couple of times and see output:
#  => CACHED [2/5] WORKDIR /app
#  => CACHED [3/5] COPY package.json yarn.lock ./
#  => CACHED [4/5] RUN yarn install --production

# Downloads the specified image and creates a new container based on this image.
FROM node:20-alpine 

# Sets the current working directory in the container, used by the subsequent commands.
WORKDIR /app

# Copies files from the host computer to the container. 
# The first two arguments (package.json, yarn.lock) are files or folders on the host computer. 
# The last argument (.) specifies the name of the file or folder to act as the destination in the container. 
# In this case, the destination is the current working directory (/app).
COPY package.json yarn.lock ./

# Executes a command in the container. Arguments to the RUN command are command-line commands.
RUN yarn install --production

COPY . .

# Creates a configuration in the new image that specifies which ports to open when the container runs. 
# If the container is running a web app, it's common to EXPOSE port 80.
# EXPOSE 80

CMD ["node", "/app/src/index.js"]

# Specifies the operation the container should run when it starts. 
# In this example, it runs the newly built app. 
# You specify the command you want to run and each of its arguments as a string array.
# ENTRYPOINT ["npm", "run", "/app/src/index.js"]