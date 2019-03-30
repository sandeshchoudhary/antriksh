FROM node:8.12.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm install
RUN npm run build

# Bundle app source
COPY . .

EXPOSE 3031

CMD npm run serve
