# Docker

## Getting started

<https://learn.microsoft.com/en-us/visualstudio/docker/tutorials/docker-tutorial>

```bash
docker run -d -p 80:80 docker/getting-started
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
docker build --tag $image_name:$tag_name .

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
docker image push $image_name:$tag_name

docker image push spetushkou/getting-started:0.1.0
```

## Show the history of an image

```bash
docker image history $image_name:$tag_name

docker image history spetushkou/getting-started:0.1.0
```

## Create and run a new container from an image

```bash
docker container run --detach --publish $port_host:$port_container $image_name:$tag_name
docker container run --interactive --tty $image_name:$tag_name $shell_command

docker container run --detach --publish 3000:3000 spetushkou/getting-started:0.1.0
docker container run --interactive --tty ubuntu ls --all
```

- `--detach` Run container in background and print container id, map port `$port_host` of the host to port `$port_container` in the container.
- `--publish` Publish a container's port(s) to the host.
- `--interactive` Keep STDIN open even if not attached.
- `--tty` Allocate a pseudo-TTY (teletypewriter), create a terminal (CLI) session.

## List containers

```bash
docker container ls
docker container ls --all
```

## Restart a container

```bash
docker container restart $container_id

docker container restart dadae2e212c1
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

```bash
docker container exec $container_id $shell_command

docker container exec 0ca97dcfcbf7 ls --all
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

## Persist data using named volumes

Assume, an app stores its data in a SQLite Database at `/etc/todos/todo.db`. SQLite Database is a relational database that stores data a single file. This approach works for small projects.

You can persist the single file on the host. When you make it available to the next container, the application can pick up where it left off. By creating a volume and attaching, or mounting, it to the folder that the data is stored in, you can persist the data. The container writes to the todo.db file and that data persists to the host in the volume.

Docker maintains the physical location the volume on the disk. Refer to the name of the volume, and Docker provides the right data.

## Create a volume

```bash
docker volume create $volume_name

docker volume create todo-db
```

## Create and run a new container from an image using a volume

```bash
docker container run --detach --publish $port_host:$port_container --volume $volume_name:$volume_location $image_name:$tag_name

docker container run --detach --publish 3000:3000 --volume todo-db:/etc/todos spetushkou/getting-started:0.1.0
```

- `--volume` Bind mount a volume.

## Inspect a volume

```bash
docker volume inspect $volume_name

docker volume inspect todo-db
```

## Persist data using bind mounts

With bind mounts, you control the exact mountpoint on the host. This approach persists data, but is often used to provide more data into containers. You can use a bind mount to mount source code into the container to let it see code changes, respond, and let you see the changes right away.

```bash
cd app
docker run --detach --publish 3000:3000 --workdir /app --volume ${PWD}:/app node:20-alpine sh -c "yarn install && yarn run dev"
```

- `workdir` Working directory inside the container.
- `--volume ${PWD}:/app` Bind mount the current directory from the host in the container into the `/app` directory.
- `node:20-alpine` The image to use. This image is the base image for your app from the Dockerfile.
- `sh -c "yarn install && yarn run dev"` A command. It starts a shell using `sh`.
