FROM mhart/alpine-node:latest

RUN apk add --no-cache --virtual builds-deps build-base make gcc g++ python

ADD ./package.json /tmp/package.json
RUN cd /tmp && npm install --build-from-source=bcrypt
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

EXPOSE 3000
