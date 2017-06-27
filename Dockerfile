FROM node:latest

COPY package.json .
RUN npm install

RUN npm install --global gulp-cli

COPY . .

RUN gulp build

EXPOSE 3001
CMD [ "npm", "start" ]