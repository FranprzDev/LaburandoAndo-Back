# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install the application dependencies
RUN npm install --production && npm cache clean --force

# Copy the rest of the application files into the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define the entry point for the container
CMD ["npm", "start"]