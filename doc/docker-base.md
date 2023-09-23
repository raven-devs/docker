# Docker: Base

## Log in to a Docker registry or cloud backend

```bash
docker login --username $user_name
docker login -u $user_name

docker login --username spetushkou
```

- `-u, --username` User name.

## Inspect docker objects

```bash
docker inspect $image_id
docker inspect $container_id
```

## Lint Dockerfile

```bash
hadolint Dockerfile
```
