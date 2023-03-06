# Base image
FROM node:12-alpine

# Create and set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Expose port 2345
EXPOSE 8080

ENV PORT=5000
ENV HOST=0.0.0.0

# Start the application
CMD ["npm", "run", "serve", "--", "--port", "2345"]

