# Docker

## Prerequisite

```bash
docker container run --detach --publish 80:80 docker/getting-started
docker container run -dp 80:80 docker/getting-started
```

## Log in to a Docker registry or cloud backend

```bash
docker login --username $user_name

docker login --username spetushkou
```

- `--username` User name.

## Start a build (create an image)

Prerequisites: Dockerfile file.

```bash
docker build --tag $image_name .

docker build --tag spetushkou/getting-started:0.1.0 .
```

- `--tag`: Name and optionally a tag (format: "name:tag").

## Create a tag that refers to a source image

```bash
docker image tag $image_name $image_name_with_tag

docker image tag getting-started spetushkou/getting-started:0.1.0
```

## Upload an image to a registry

```bash
docker image push $image_name

docker image push spetushkou/getting-started:0.1.0
```

## Show the history of an image

How the image was built, meaning the steps in its Dockerfile.

```bash
docker image history --no-trunc $image_name

docker image history spetushkou/getting-started:0.1.0
docker image history --no-trunc spetushkou/getting-started:0.1.0 > image_history.log
```

`--no-trunc` Don't truncate output.

## List images

```bash
docker image ls
docker image ls --all
docker image ls -a
```

## Remove an image

```bash
docker image rm $image_name
```

## Create and run a new container from an image

```bash
docker container run --name $container_name --detach --publish $port_host:$port_container $image_name
docker container run --name $container_name -dp $port_host:$port_container $image_name
docker container run --name $container_name --interactive --tty --rm $image_name $shell_command
docker container run --name $container_name -it --rm $image_name $shell_command

docker container run --name getting-started  --detach --publish 3000:3000 spetushkou/getting-started:0.1.0
docker container run --name getting-started  -dp 3000:3000 spetushkou/getting-started:0.1.0
docker container run --name getting-started --interactive --tty --rm ubuntu ls --all
docker container run --name getting-started -it --rm ubuntu ls --all
```

- `--name` Assign a name to the container.
- `-d`, `--detach` Run container in background and print container id, map port `$port_host` of the host to port `$port_container` in the container.
- `-p`, `--publish` Publish a container's port(s) to the host.
- `-i`, `--interactive` Keep STDIN open even if not attached.
- `-t`, `--tty` Allocate a pseudo-TTY (teletypewriter), create a terminal (CLI) session.
- `--rm` Automatically remove the container when it exits.

## List containers

```bash
docker container ls
docker container ls --all
docker container ls -a
```

## Restart a container

```bash
docker container restart $container_id

docker container restart dadae2e212c1
```

## Pause a container

```bash
docker container pause $container_id

docker container pause dadae2e212c1
```

## Stop a container

```bash
docker container stop $container_id

docker container stop dadae2e212c1
```

## Remove a container

```bash
docker container rm $container_id

docker container rm dadae2e212c1
```

## Execute a command in a running container

If the image contains a shell, you can run an interactive shell container using that image and explore whatever content that image has. If `sh` is not available, the busybox `ash` shell might be.

```bash
docker container exec $container_id $sh_command
docker container exec --interactive --tty $container_id bash
docker container exec -it $container_id bash
docker container run --interactive --tty $container_id sh
docker container run -it $container_id sh

docker container exec 0ca97dcfcbf7 ls --all
docker container exec -it mysql-instance bash
docker container run -it getting-started sh
```

## Fetch the logs of a container

```bash
docker logs --follow --timestamps --tail $num_lines --since $date_time_utc --until $date_time_utc $container_id

docker logs --follow --timestamps --tail 1000 900fc5096782
docker logs --follow --timestamps --since "2023-09-03T09:00:00.000Z" --until "2023-09-03T23:59:59.000Z" 900fc5096782
```

- `--follow` Follow log output.
- `--timestamps` Show timestamps.
- `--tail` Number of lines to show from the end of the logs.
- `--since` Show logs since timestamp (e.g. "2013-01-02T13:23:37Z") or relative (e.g. "42m" for 42 minutes).
- `--until` Show logs before a timestamp (e.g. "2013-01-02T13:23:37Z") or relative (e.g. "42m" for 42minutes).
