FROM node:hydrogen-alpine3.17
ENV APP_HOME=/usr/src/app/
WORKDIR $APP_HOME
COPY package*.json ./
RUN npm clean-install --omit=dev
COPY . .
CMD [ "node", "index.js" ]
