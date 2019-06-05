FROM node:8.11.0-slim

ENV NODE_ENV production
WORKDIR /srv
COPY dist .
EXPOSE 9007
ENTRYPOINT [ "node", "server.js" ]
