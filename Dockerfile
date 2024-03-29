# Install Linux Alpine and Node.js
# *use alpine for smaller file size
FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

RUN npm run build

# Bundle app source
COPY . .

# Production host
EXPOSE 3000

# Start app
CMD ["node", "dist/index.js"]

# FROM node:alpine
# WORKDIR /app
# COPY . /app
# RUN npm install
# RUN npm run build
# EXPOSE 5000
# CMD node dist/index.js