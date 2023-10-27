#!/usr/bin/bash

# configure nvm & node
source ~/.nvm/nvm.sh
echo "nvm version is: $(nvm --version)"
nvm use 18
echo "node version is: $(node --version)"

# npm install && build
npm install && npm run build 2>&1 > /dev/null

# reload nginx
sudo ./d.sh
