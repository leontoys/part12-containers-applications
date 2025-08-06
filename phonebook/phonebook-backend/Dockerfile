#FROM node:20

#WORKDIR /usr/src/app

#COPY . . 

#RUN npm install

#CMD [ "npm", "run","build" ]

FROM node:20

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci 

ENV DEBUG=todo-backend:*

USER node

CMD npm start