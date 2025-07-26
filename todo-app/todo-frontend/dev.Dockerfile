FROM node:20

WORKDIR /usr/src/app

COPY . . 

#for dev model
RUN npm install 

CMD [ "npm","run","dev","--","--host" ]