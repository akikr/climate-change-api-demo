FROM node:lts-hydrogen
ENV APP_HOME=/usr/src/app/
WORKDIR $APP_HOME
COPY package*.json ./
RUN npm clean-install --omit=dev
COPY . .
CMD [ "node", "index.js" ]
