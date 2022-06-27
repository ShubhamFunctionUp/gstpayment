FROM node:latest

WORKDIR /the/workdir/path

COPY package* .json

RUN npm CI

copy . .

EXPOSE 3000

CMD ["node","index.js"]

RUN docker with port


