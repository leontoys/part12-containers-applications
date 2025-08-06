#FROM node:20

#WORKDIR /usr/src/app

#COPY . .

#RUN npm ci

#RUN npm run build

#RUN npm install -g serve

#CMD [ "serve","dist" ]

FROM node:20

WORKDIR /usr/src/app

COPY . .

# Change npm ci to npm install since we are going to be in development mode
RUN npm install

# npm run dev is the command to start the application in development mode
CMD ["npm", "run", "dev", "--", "--host"]