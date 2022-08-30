FROM node:latest

RUN mkdir -p /usr/src/ui

WORKDIR /usr/src/ui


COPY . /usr/src/ui/

RUN npm install

CMD ["npm", "start"]