FROM node:16


# Kullanıcı oluştur
RUN useradd -ms /bin/bash ubuntu

# Kullanıcıyı seç
USER ubuntu
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "npm", "run","dev" ]