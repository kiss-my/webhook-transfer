FROM node:lts-alpine

ARG APP_PORT

ENV APP_PORT=${APP_PORT:-3000}

WORKDIR /tmp
COPY package.json /tmp/
COPY package-lock.json /tmp/

RUN npm install

WORKDIR /home/node
COPY . /home/node

RUN mv /tmp/node_modules /home/node/
RUN mv /tmp/package-lock.json /home/node

RUN chown -R 1000:1000 /home/node

EXPOSE ${APP_PORT}

USER node

ENTRYPOINT ["npm"]
CMD ["run", "start"]
