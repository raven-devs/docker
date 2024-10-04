# Docker run

```bash
# MongoDB
docker run --name mongo -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=secret -p 27017:27017 -d mongo

# PostgeSQL
docker run --name postgres -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres

# Redis
docker run --name redis -p 6379:6379 -d redis
```
