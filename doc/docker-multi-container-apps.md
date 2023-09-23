# Docker: Multi-container apps

Using multiple containers allows you to dedicate containers for specialized tasks. Each container should do one thing and do it well.

Containers, by default, run in isolation. They don't know anything about other processes or containers on the same computer. To allow one container to talk to another, use networking.

If two containers are on the same network, they can talk to each other. If they aren't, they can't.

There are two ways to put a container on a network: assign it at start or connect an existing container.

## Start MySQL

### 1. Create a network

```bash
docker network create $network_name

docker network create todo-app
```

### 2. Start a database container and attach it a network

```bash
docker container run \
    --init \
    --network $network_name \
    --network-alias $network_alias \
    --platform $platform_id \
    --env $ENV_NAME=$env_value \
    $db_image_name

docker container run \
    --init \
    --detach \
    --network todo-app \
    --network-alias mysql \
    --platform linux/x86_64/v8 \
    --volume todo-mysql-data:/var/lib/mysql \
    --env MYSQL_ROOT_PASSWORD=admin \
    --env MYSQL_DATABASE=todos \
    mysql:5.7
```

- `--network` Connect a container to a network.
- `--network-alias` Add network-scoped alias for the container.
- `--env` Set environment variables.
- `--platform` Set platform if server is multi-platform capable.

### 3. Get the database container id

```bash
docker container ls
```

### 4. Confirm you have the database up and running, connect to the database

```bash
docker exec --interactive --tty $container_id mysql -p
docker exec -it $container_id mysql -p

docker exec --interactive --tty 8b100ba4521a mysql -p
```

### 5. In the dabase shell, list the databases and verify you see the `todos` database

```SQL
show databases;
```

### 6. Return to the terminal command prompt

```bash
exit
```

## Run an app with MySQL

The `todo` app supports the setting of environment variables to specify MySQL connection settings.

- `MYSQL_HOST` The hostname for the MySQL server.
- `MYSQL_USER` The username to use for the connection.
- `MYSQL_PASSWORD` The password to use for the connection.
- `MYSQL_DB` The database to use once connected.

### 1. Start the app and connect that container to the MySQL container

```bash
docker container run \
  --init \
  --detach \
  --publish 3000:3000 \
  --workdir /app \
  --volume ${PWD}:/app \
  --network todo-app \
  --env MYSQL_HOST=mysql \
  --env MYSQL_USER=root \
  --env MYSQL_PASSWORD=admin \
  --env MYSQL_DB=todos \
  node:20-alpine \
  sh -c "yarn install && yarn run dev"
```

### 2. Add some items to your todo list

```bash
http://localhost:3000
```

### 3. Verify that the items are being written to the database

```bash
docker exec --interactive --tty $container_id mysql -p $db_name
docker exec -it $container_id mysql -p $db_name

docker exec --interactive --tty 8b100ba4521a mysql -p todos
```

```SQL
use todos;
select * from todo_items;
```

## Run the application stack

Prerequisite: app/docker-compose.yml

```bash
docker-compose up --detach
```

## Remove the application stack

Prerequisite: app/docker-compose.yml

```bash
docker-compose down
```
