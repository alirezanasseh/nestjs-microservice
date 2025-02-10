# Development Stage
FROM node:22-alpine AS development

# Set working directory inside the container
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the entire application
COPY . .

# Start Orders in development mode using Nodemon
CMD ["npx", "nodemon", "--config", "apps/orders/nodemon.json"]

# ========================================
# Production Stage
FROM node:22-alpine AS production

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY /apps/orders ./apps/orders
COPY /nest-cli.json tsconfig.json ./

# Build the application
RUN npm run build orders

# Generate Prisma client
RUN npx prisma generate --schema apps/orders/prisma/schema.prisma

# Start the application
CMD ["node", "dist/apps/orders/main"]
