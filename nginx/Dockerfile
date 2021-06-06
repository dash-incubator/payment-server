FROM nginx:1.19.2-alpine

ARG DOMAIN
ARG NODE_CONTAINER
ARG NODE_PORT
ARG PUBLIC_DIRECTORY

# Upload Configuration
COPY ./conf.d /etc/nginx/conf.d

# Update Package List
RUN apk update \
    # Upgrade Existing Extensions
    && apk upgrade \
    # Install Dependencies
    && apk add --no-cache \
        gettext \
        moreutils \
    # Setup For Unix Socket Usage
    && addgroup nginx nobody \
    # Substitute Variables
    && sh -c " \
        envsubst '\$DOMAIN \$NODE_CONTAINER \$NODE_PORT \$PUBLIC_DIRECTORY' < /etc/nginx/conf.d/default.conf | sponge /etc/nginx/conf.d/default.conf \
    "

CMD ["nginx", "-g", "daemon off;"]
