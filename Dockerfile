FROM node:20.8.0
WORKDIR /app
COPY package.json ./
RUN npm install -g
RUN npm install ts-node -g
RUN npm install -g nodemon
COPY . .
EXPOSE 3000
CMD ["npm","run","start"]