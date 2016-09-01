FROM node

# Set up environment
RUN npm config set proxy $http_proxy
RUN npm config set https-proxy $https_proxy

# Install app
ENV INSTALL_PATH="/opt/node"
RUN ["mkdir", "-p", "$INSTALL_PATH"]
ADD package.json $INSTALL_PATH/package.json
ADD index.js $INSTALL_PATH/index.js

# Define working directory
WORKDIR $INSTALL_PATH

# Install dependencies
RUN npm install -g nodemon
RUN npm install

# Expose port
EXPOSE 8080

# Run app
ENTRYPOINT npm start
