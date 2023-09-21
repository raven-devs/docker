# Docker: Persist data

## Persist data using named volumes

Assume, an app stores its data in a SQLite Database at `/etc/todos/todo.db`. SQLite Database is a relational database that stores data a single file. This approach works for small projects.

You can persist the single file on the host. When you make it available to the next container, the application can pick up where it left off. By creating a volume and attaching, or mounting, it to the folder that the data is stored in, you can persist the data. The container writes to the todo.db file and that data persists to the host in the volume.

Docker maintains the physical location the volume on the disk. Refer to the name of the volume, and Docker provides the right data.

### Create a volume

```bash
docker volume create $volume_name

docker volume create todo-db
```

### Create and run a new container from an image using a volume

```bash
docker container run --detach --publish $port_host:$port_container --volume $volume_name:$volume_location $image_name

docker container run --detach --publish 3000:3000 --volume todo-db:/etc/todos spetushkou/getting-started:0.1.0
```

- `--volume` Bind mount a volume.

### Inspect a volume

```bash
docker volume inspect $volume_name

docker volume inspect todo-db
```

## Persist data using bind mounts

With bind mounts, you control the exact mountpoint on the host. This approach persists data, but is often used to provide more data into containers. You can use a bind mount to mount source code into the container to let it see code changes, respond, and let you see the changes right away.

```bash
cd app
docker container run --detach --publish 3000:3000 --workdir /app --volume ${PWD}:/app node:20-alpine sh -c "yarn install && yarn run dev"
```

- `workdir` Working directory inside the container.
- `--volume ${PWD}:/app` Bind mount the current directory from the host in the container into the `/app` directory.
- `node:20-alpine` The image to use. This image is the base image for your app from the Dockerfile.
- `sh -c "yarn install && yarn run dev"` A shell command. It starts a shell using `sh`.
