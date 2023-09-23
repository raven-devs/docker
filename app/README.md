# app

```bash
cd app
docker build . -t getting-started
docker run --init -dp 3000:3000 getting-started
curl localhost:3000
```
