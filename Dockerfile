# Use the official Node.js image from the DockerHub
FROM node:18

# Set the working directory in the Docker image
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the rest of the application code into the image
COPY . .

# Build the Next.js app
RUN npm run dev

# Expose port 3000 (or whichever port your app runs on)
EXPOSE 3000

# Command to run the application
CMD ["npm","run dev"]
