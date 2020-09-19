# Using the NODE base image
FROM node

# Set the Workdir for the app
WORKDIR /usr/app

# Copy all package*.json to the container
COPY package*.json ./

# Install all the necessary packages
RUN npm install

# Copy all the files to the current dir
COPY . .

# Export port 5000
EXPOSE 5000

# And finally, run the app.js
CMD [ "node", "app.js" ]

