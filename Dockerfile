FROM node:12

WORKDIR /

COPY package*.json ./

RUN npm install


COPY . .

RUN npm run-script build

EXPOSE 8080

ENV NODE_PATH=./
CMD ["node", "dist/server.js"]