# Docker: Image

## Start an image build

Prerequisites: Dockerfile file.

```bash
docker build . --tag $image_name
docker build . -t $image_name
docker build . -t $image_name --build-arg="ARG_NAME=arg_value" --progress=plain --no-cache

docker build . --tag spetushkou/getting-started:0.1.0 .
docker build . -t spetushkou/app-nodejs --build-arg="NODE_ENV=production" --progress=plain --no-cache
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

## Remove unused images (WARNING)

```bash
docker image prune
```

## Quick overview of an image

```bash
docker scout quickview
docker scout quickview $image_name

docker scout quickview docker/getting-started
```
