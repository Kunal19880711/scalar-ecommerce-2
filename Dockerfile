# Dockerfile

## core
FROM node:22.12.0-alpine AS core

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

## ms-controlpanel
FROM core AS ms-controlpanel

### Set work directory
WORKDIR /home/node

### Set user node
USER node

### Exposing ports for the container 
EXPOSE 8000

CMD ["pnpm", "--filter", "ms-controlpanel", "start"]
