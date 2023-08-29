# Docker

## Run a container

```bash
docker run -d -p ${port_host}:${port_container} ${image_name}

docker run -d -p 80:80 docker/getting-started
```

`-d` run in a detached mode, in the background

`-p 80:80` map port 80 of the host to port 80 in the container

`docker/getting-started` specifies the image to use

## Get a container id

```bash
docker ps
```

## Stop and remove a container

```bash
docker stop ${container_id}
docker rm ${container_id}
```

## Create a container image

Prerequisites: Dockerfile file.

```bash
docker build -t ${tag_name} .
```
