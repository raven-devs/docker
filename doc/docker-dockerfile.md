# Docker: Dockerfile

## CMD and ENTRYPOINT

Docker `ENTRYPOINT` and `CMD` can have two forms: Shell and Exec form.

```bash
<instruction> <command>  ---> shell form
<instruction> ["executable", "parameter"]  ---> exec form

CMD echo "Hello World" (shell form)
CMD ["echo", "Hello World"] (exec form)
ENTRYPOINT echo "Hello World" (shell form)
ENTRYPOINT ["echo", "Hello World"] (exec form)
```

Both the commands are used to specify the programs/commands to execute while initializing a container from a docker image.
CMD: Sets default parameters that can be overridden from the Docker command line interface (CLI) while running a docker container.
ENTRYPOINT: Sets default parameters that cannot be overridden while executing Docker containers with CLI parameters.

CMD commands are ignored by daemon when there are parameters stated within the docker run command while
ENTRYPOINT instructions are not ignored but instead are appended as command line parameters by treating those as
arguments of the command.

See examples: ./app-dockerfile-cmd, ./app-dockerfile-entrypoint
