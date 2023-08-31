# Docker

## Login to Docker Hub

```bash
docker login -u $user_name

docker login -u spetushkou
```

## Create an image

Prerequisites: Dockerfile file.

```bash
docker build -t $image_name:$tag_name .

docker build -t spetushkou/getting-started:0.1.0 .
```

## Give an image a new name

```bash
docker tag $old_image_name $new_image_name

docker tag getting-started spetushkou/getting-started:0.1.0
```

## Push an image to Docker Hub

```bash
docker push $image_name:$tag_name

docker push spetushkou/getting-started:0.1.0
```

## Run a container

```bash
docker run -d -p $port_host:$port_container $image_name:$tag_name

docker run -d -p 3000:3000 spetushkou/getting-started:0.1.0
```

`-d` run in a detached mode, in the background

`-p $port_host:$port_container` map port `$port_host` of the host to port `$port_container` in the container

`$image_name:$tag_name` specifies the image to use

## Get container info

```bash
docker ps
```

## Stop and remove a container

```bash
docker stop $container_id
docker rm $container_id

docker stop dadae2e212c1
docker rm dadae2e212c1
```
