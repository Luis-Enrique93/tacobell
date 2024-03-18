# Base image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Debug: List files in current directory
RUN ls -la

# Install app dependencies
RUN npm install

# Debug: List installed packages
RUN npm list

# Debug: List files in current directory
RUN ls -la

# Bundle app source
COPY . .

# Debug: List files in current directory after copying app source
RUN ls -la

# Start the server using the production build
CMD [ "node", "app.js" ]