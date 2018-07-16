FROM node:10.6-alpine
COPY . /app
CMD [ "node", "/app/index.js" ]