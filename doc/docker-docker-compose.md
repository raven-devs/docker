# Docker: Docker Compose

## Parse config file

```shell
docker compose config
```

## Build services

```shell
docker compose build  # build images
```

## Create, start services

```shell
docker compose up # create and start services
docker compose create # create services
docker compose start # start services
docker compose restart # restart services
```

## Stop pause and remove services, networks

```shell
docker compose down # stop and remove services
docker compose stop # stop services
docker compose pause # pause services
docker compose unpause # unpause services
docker compose rm # remove services
docker compose kill # force stop services
```

## Commands

```shell
docker compose exec $service_name $command  # run a command in a running container
docker compose run $service_name $command # start a new container and run a command

docker compose exec server ls -a
docker compose run server ls -a
```

## Output

```shell
docker compose logs # view logs
docker compose images # list images
docker compose ps # list containers
docker compose ls # list running compose projects
docker compose port $service_name $port # list the public port for a port binding
docker compose top  # list the running processes
```
