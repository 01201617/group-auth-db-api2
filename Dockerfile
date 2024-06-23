FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY ormconfig.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]