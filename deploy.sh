#!/bin/sh

NODE_VERSION=17.7.0
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
# node -v
# nvm install $NODE_VERSION
# nvm use $NODE_VERSION

# npm install
# npm run build
npm start