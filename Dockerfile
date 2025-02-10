# Stage 1: Build Angular App
FROM node:22.13.1-alpine AS build

# Set environment variable for build stage
ENV NODE_ENV=production
ENV BASE_URL="http://localhost:8080"

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install
RUN NODE_ENV=development npm install @angular-devkit/build-angular@19.1.5

# Copy all source files
COPY . .

# Build Angular app for production
RUN npm run config
RUN npm run build-prod

# Stage 2: Setup Express.js Server
FROM node:22.13.1-alpine AS server

# Set working directory for the server
WORKDIR /app

# Copy package files
COPY package*.json ./

# Copy only necessary files from the build stage
#COPY --from=build /app /app
COPY --from=build /app/dist/angular-book-seller/browser /app/dist/angular-book-seller/browser
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/server.js /app/

# Expose port (Render uses dynamic ports)
EXPOSE 8081

# Start the Express.js server
CMD ["npm", "run", "start"]
