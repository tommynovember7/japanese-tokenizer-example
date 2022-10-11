FROM node:lts-alpine AS node
FROM python:3-alpine

RUN apk --no-cache add \
    'autoconf>=2.71-r0' \
    'automake>=1.16.5-r0' \
    'bash>=5.1.16-r2' \
    'bind-tools>=9.16.29-r0' \
    'build-base>=0.5-r3' \
    'curl>=7.83.1-r2' \
    'g++>=11.2.1_git20220219-r2' \
    'gcc>=11.2.1_git20220219-r2' \
    'git>=2.36.2-r0' \
    'groff>=1.22.4-r1' \
    'lcms2-dev>=2.13.1-r0' \
    'libgit2-dev>=1.4.3-r0' \
    'libtool>=2.4.7-r0' \
    'make>=4.3-r0' \
    'nasm>=2.15.05-r0' \
    'openssh>=9.0_p1-r2' \
    'zlib-dev>=1.2.12-r3'

# python
ENV PYTHONUTF8=1 \
    PYTHONUNBUFFERED=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_NO_CACHE_DIR=on
RUN python -m ensurepip && \
    pip install --no-cache --upgrade pip setuptools

COPY --from=node /usr/local/lib /usr/lib
COPY --from=node /usr/local/include /usr/include
COPY --from=node /usr/local/bin /usr/bin
COPY --from=node /opt /opt

RUN npm install -g \
    npm@latest \
    node-gyp \
    @grpc/grpc-js \
    npm-check-updates
