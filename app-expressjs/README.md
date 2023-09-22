# app-expressjs

## Build an image and run a container

```bash
docker build . -t spetushkou/app-expressjs --build-arg="NODE_ENV=production"
docker build . -t spetushkou/app-expressjs --build-arg="NODE_ENV=production" --progress=plain --no-cache # DEBUG
docker run -dp 3000:3000 --rm spetushkou/app-expressjs

docker-compose up
```

## Test a container

```bash
docker ps
docker logs $container_id
docker exec -it $container_id /bin/bash
apt-get update && apt-get install curl -y && apt-get clean
curl --head localhost:3000
```

## Stop a container

```bash
$ docker stop $container_id
curl --head localhost:3000
# curl: (7) Failed to connect to localhost port 3000 after 6 ms: Couldn't connect to server

docker-compose down
```
