# Check out https://hub.docker.com/_/node to select a new base image
FROM node:10-slim

# Set to a non-root built-in user `node`
USER node

# Create app directory (with user `node`)
RUN mkdir -p /home/node/app

WORKDIR /home/node/app

VOLUME ["/home/node/app/data"]

# Bundle app source code
COPY --chown=node . .

RUN npm install

RUN npm run build

# Bind to all network interfaces so that it can be mapped to the host OS
ENV HOST=0.0.0.0
ENV PORT=8080
ENV FILE_SERVER_API_KEY=${FILE_SERVER_API_KEY}

EXPOSE ${PORT}
CMD [ "node", "dist/server.js" ]
