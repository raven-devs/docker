# app-nodejs

## Build an image and run a container

```bash
cd app-nodejs
docker build . -t spetushkou/app-nodejs --build-arg="NODE_ENV=production"
docker build . -t spetushkou/app-nodejs --build-arg="NODE_ENV=production" --progress=plain --no-cache # DEBUG
docker run --init -d -p 3000:3000 --rm spetushkou/app-nodejs

or

docker-compose up
```

## Test a container

```bash
docker container ls
docker logs $container_id

curl localhost:3000
```

## Stop a container

```bash
docker container ls
docker container stop $container_id
curl localhost:3000 # curl: (7) Failed to connect to localhost port 3000 after 6 ms: Couldn't connect to server

or

docker-compose down
```

## Development environment (nodejs)

```bash
docker-compose -f docker-compose.dev.yml up
docker-compose down
```

## Test image with a dockerignore file

```bash
docker build . -f Dockerfile-testignore -t dockerfile-testignore
docker run --init -it dockerfile-testignore /bin/sh
ls -a
exit
```
