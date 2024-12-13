# Dockerfile

## sec-all
FROM node:22.12.0-alpine AS sec-all

## Global dependencies
RUN npm install -g pnpm

### Set work directory
RUN mkdir -p /home/node && chown -R node:node /home/node
WORKDIR /home/node

### Copying
COPY --chown=node:node . .

### Set user node
USER node

### Build
RUN pnpm install --frozen-lockfile && pnpm exec nx run-many -t build

### Exposing ports for the container 
EXPOSE 8080

## deployer
FROM docker:dind AS deployer

### Install Google Cloud SDK
RUN apk add --no-cache --update nodejs-current npm python3 py3-pip tar && \
    # install google-cloud-sdk
    mkdir -p /opt/google-cloud-sdk && \
    wget https://dl.google.com/dl/cloudsdk/channels/rapid/downloads/google-cloud-cli-linux-x86_64.tar.gz && \
    tar -xf google-cloud-cli-linux-x86_64.tar.gz --directory /opt/google-cloud-sdk --strip-components=1 && \
    /opt/google-cloud-sdk/install.sh -q && \
    rm -rf google-cloud-cli-linux-x86_64.tar.gz && \
    npm install -g commander

### Set path of Google Cloud SDK
ENV PATH="$PATH:/opt/google-cloud-sdk/bin"
