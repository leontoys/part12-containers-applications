#build stage added
FROM node:20 AS build-stage 

WORKDIR /usr/src/app

COPY . . 

RUN npm ci  

RUN npm run build 

#RUN npm install -g serve

#CMD [ "serve", "dist" ]

FROM  nginx:1.25-alpine 

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html