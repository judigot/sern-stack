# Install Linux Alpine and Node.js
# *use alpine for smaller file size
FROM node:alpine

# Set project directory
WORKDIR /app

# Copy project files to "app" directory
COPY . /app

# Install dependencies inside package.json
RUN npm install

# Production host
EXPOSE 3000

# Start app
CMD node dist/index.js