# Base image
FROM node:14

# Create app directory
WORKDIR /usr/src

# Install dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Expose the port
EXPOSE 3000

# Start the app
CMD ["node", "server.js"]
