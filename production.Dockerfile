FROM node:12-alpine
WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm i

COPY src/ src/
COPY tsconfig.json ./

RUN npm run build

CMD ["npm", "start"]