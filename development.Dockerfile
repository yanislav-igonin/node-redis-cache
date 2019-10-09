FROM node:12-alpine
WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm i

CMD ["npm", "run", "dev"]