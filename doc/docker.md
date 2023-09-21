# Docker

## Log in to a Docker registry or cloud backend

```bash
docker login --username $user_name
docker login -u $user_name

docker login --username spetushkou
```

- `-u, --username` User name.

## Start a build (create an image)

Prerequisites: Dockerfile file.

```bash
docker build . --tag $image_name
docker build . -t $image_name
docker build . -t $image_name --build-arg="ARG_NAME=arg_value" --progress=plain --no-cache

docker build . --tag spetushkou/getting-started:0.1.0 .
docker build . -t spetushkou/app-expressjs --build-arg="NODE_ENV=production" --progress=plain --no-cache
```

- `-t --tag` Name and optionally a tag (format: "name:tag").
- `--progress` Set type of progress output ("auto", "plain", "tty"). Use plain to show container output (default "auto").
- `--no-cache` Do not use cache when building the image. Cached containers do not show any output.
- `--build-arg` Set build-time variables.

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

`-a, --all` Show all images.

## Inspect an image

```bash
docker image rm $image_name
```

## Remove an image

```bash
docker image rm $image_name
```

## Create and run a new container from an image

```bash
docker container run --name $container_name --detach --publish $port_host:$port_container $image_name
docker container run -d -p $port_host:$port_container $image_name
docker container run --interactive --tty --rm $image_name $shell_command
docker container run --interactive --tty --rm --env "ENV_NAME=env_value" $image_name $shell_command
docker container run --interactive --tty --rm --env ENV_NAME $image_name $shell_command # ENV_NAME value will be taken from host
docker container run --interactive --tty --rm --env-file=.env_file $image_name $shell_command
docker container run -i -t --rm $image_name $shell_command
docker container run -i -t --rm -e "ENV_NAME=env_value" $image_name $shell_command
docker container run -i -t --rm -e "ENV_NAME=env_value" $image_name $shell_command
docker container run --rm -m "300M" --memory-swap "1G" $image_name

docker container run --name getting-started --detach --publish 3000:3000 spetushkou/getting-started:0.1.0
docker container run -d -p 3000:3000 spetushkou/getting-started:0.1.0
docker container run --interactive --tty --rm ubuntu ls --all
docker container run -i -t --rm ubuntu ls --all
docker container run -i -t --rm -e "NODE_ENV=development" ubuntu printenv
docker container run -i -t --rm --env NODE_ENV ubuntu printenv
docker container run -i -t --rm --env-file=.env ubuntu printenv
```

- `--name` Assign a name to the container.
- `-d, --detach` Run container in background and print container id, map port `$port_host` of the host to port `$port_container` in the container.
- `-p, --publish` Publish a container's port(s) to the host.
- `-i, --interactive` Keep STDIN open even if not attached.
- `-t, --tty` Allocate a pseudo-TTY (teletypewriter), create a terminal (CLI) session.
- `--rm` Automatically remove the container when it exits.
- `-e, --env` Set environment variables. The host will override the value. If no value provided then a value will be provided by the host.
- `--env-file` Read in a file of environment variables.
- `-m, --memory` Memory limit.
- `--memory-swap` Swap limit equal to memory plus swap: '-1' to enable unlimited swap.

## List containers

```bash
docker container ls
docker container ls --all
docker container ls -a
```

`-a, --all` Show all containers.

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

## Kill a container

```bash
docker container kill $container_id

docker container kill dadae2e212c1
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

docker container exec --interactive --tty $container_id /bin/bash
docker container exec -i -t $container_id /bin/bash
docker container exec -i -t $container_id bash

docker container run --interactive --tty $container_id /bin/sh
docker container run -i -t $container_id /bin/sh
docker container run -i -t $container_id sh

docker container exec 0ca97dcfcbf7 ls --all
docker container exec -i -t mysql-instance /bin/bash
docker container run -i -t getting-started /bin/sh
docker container run -i -t getting-started sh
```

## Export a container's filesystem as a tar archive

```bash
docker export $container_id > $archive_file.tar

docker container create --name=tmp-container getting-started
docker container export tmp-container > /Users/spetushkou/Projects/docker/getting-started.tar
docker container rm tmp-container
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

## Install an app in a container

```bash
docker container exec -i -t $container_id /bin/bash
apt-get update && apt-get install curl -y && apt-get clean
```

## Run a shell command in a container

```bash
docker container run $container_id sh -c "$shell_command"

docker container run -d -p 3000:3000 --workdir /app --volume ${PWD}:/app node:20-alpine sh -c "npm install && npm run dev"
```

## Inspect docker objects

```bash
docker inspect $image_id
docker inspect $container_id
```

## View summary of an image

```bash
docker scout quickview
```
