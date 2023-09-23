# app-dockerfile-entrypoint

```bash
cd app-dockerfile-entrypoint
docker build -t app-dockerfile-entrypoint .
docker run --init app-dockerfile-entrypoint  # will run a ENTRYPOINT command
docker run --init app-dockerfile-entrypoint printenv  # will run a ENTRYPOINT command AND append the cli parameter as a ENTRYPOINT parameter
```
