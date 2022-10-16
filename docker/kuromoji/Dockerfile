FROM node:10-alpine

RUN apk --no-cache add \
    'bash' \
    'curl' \
    'git' \
    'openssh' \
    'zlib-dev'

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh
