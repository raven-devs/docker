# app-dockerfile-cmd

```bash
cd app-dockerfile-cmd
docker build -t app-dockerfile-cmd .
docker run --init app-dockerfile-cmd  # will run a CMD default command as there are no cli parameters here
docker run --init app-dockerfile-cmd echo "message changed"  # will NOT run a CMD default command as there is a cli parameter
docker run --init app-dockerfile-cmd env  # will NOT run a CMD default command as there is a cli parameter
```
