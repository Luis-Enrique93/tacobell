# Base image
FROM node:18

ENV NODE_ENV=development

# Create app directory
WORKDIR /app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json .

# Install app dependencies
RUN npm install && npm cache clean --force && npm install sails -g

# Bundle app source
COPY . .

# Start the server using the production build
CMD [ "node", "app.js" ]