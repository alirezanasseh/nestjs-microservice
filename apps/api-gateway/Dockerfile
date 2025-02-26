# Development Stage
FROM node:22-alpine AS development

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire codebase
COPY . .

# Build the shared library first
RUN npm run build shared-types

# Expose API Gateway port
EXPOSE 3000

# Use our custom entrypoint
ENTRYPOINT ["docker-entrypoint.sh"]

# Start API Gateway in development mode using Nodemon
CMD ["npx", "nodemon", "--config", "apps/api-gateway/nodemon.json"]

# ========================================
# Production Stage
FROM node:22-alpine AS production

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --omit=dev

# Copy the entire codebase
COPY . .

# Build shared libraries first (without cleaning)
RUN npm run build shared-types --no-clean

# Build the API Gateway
RUN npm run build api-gateway

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "dist/apps/api-gateway/main"]