FROM node:12.16.2-alpine3.9
RUN apk add g++ make python
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN chmod +x /docker/node/wait
CMD /docker/node/wait
CMD [ "npm", "run", "dev" ]