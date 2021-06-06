FROM redis:5.0.7-alpine

ARG REDIS_MAXMEMORY
ARG REDIS_PASSWORD
ARG REDIS_PORT
ARG REDIS_SOCKET
ARG SOCKET_DIR

# Upload Configuration
COPY ./redis /usr/local/etc/redis

# Update Package List
RUN apk update \
    # Upgrade Existing Extensions
    && apk upgrade \
    # Install Dependencies
    && apk add --no-cache \
        gettext \
        moreutils \
    # Redis Socket Creation Fails If
    # - Incorrect Permissions Are Used
    # - Directory Doesn't Exist
    # - ID's Found In Redis Dockerfile
    && install -g 999 -o 999 -d ${SOCKET_DIR} \
    # Substitute Variables
    && sh -c " \
        envsubst '\$REDIS_MAXMEMORY \$REDIS_PASSWORD \$REDIS_PORT \$REDIS_SOCKET' < /usr/local/etc/redis/redis.conf | sponge /usr/local/etc/redis/redis.conf \
    "

CMD ["redis-server", "/usr/local/etc/redis/redis.conf"]
