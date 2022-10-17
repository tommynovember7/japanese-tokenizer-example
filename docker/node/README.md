# Node.js Docker Settings

## Snippets

### Logging in

#### docker hub

```shell
echo $DOCKER_TOKEN | docker login -u $DOCKER_USER_NAME --password-stdin
```

### BUild the custom image

```shell
docker buildx build --platform linux/amd64,linux/arm64 --no-cache --pull --push --tag tommynovember7/node-lts:latest ./docker/node/
```

## Appendix

### Check current platform

```shell
uname -m
```

### Docker buildx

- [docker buildx](https://github.com/docker/buildx#getting-started)

If you're using an M1 or M2-ready computer, you might want to run `docker buildx create` first.

```shell
$ docker buildx ls
NAME/NODE       DRIVER/ENDPOINT STATUS  PLATFORMS
desktop-linux   docker
  desktop-linux desktop-linux   running linux/arm64, linux/amd64, linux/riscv64, linux/ppc64le, linux/s390x, linux/386, linux/arm/v7, linux/arm/v6
default *       docker
  default       default         running linux/arm64, linux/amd64, linux/riscv64, linux/ppc64le, linux/s390x, linux/386, linux/arm/v7, linux/arm/v6
```
