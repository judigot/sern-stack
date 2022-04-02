# This Dockerfile installs Linux Alpine and Node.js and Git

# *use alpine for smaller file size

FROM node:alpine

RUN apk update