# Use an official Node runtime as the base image
FROM node:14

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the workspace directory (/app)
COPY package*.json /app/

# Install the application dependencies
RUN npm install

# Copy the current directory contents into the workspace directory in the container
COPY . /app

# Make port 4200 available to the outside world (the port your app runs on)
EXPOSE 4200

# Run ng serve command when the container launches
CMD ["npm", "start"]
