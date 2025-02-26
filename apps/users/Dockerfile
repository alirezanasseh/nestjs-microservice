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

# Generate Prisma client
RUN npx prisma generate --schema apps/users/prisma/schema.prisma

# Start Users in development mode using Nodemon
CMD ["npx", "ts-node", "-r", "tsconfig-paths/register", "apps/api-gateway/src/main.ts"]

# ========================================
# Production Stage
FROM node:22-alpine AS production

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application files
COPY /apps/users ./apps/users
COPY /nest-cli.json tsconfig.json ./

# Build the application
RUN npm run build users

# Generate Prisma client
RUN npx prisma generate --schema apps/users/prisma/schema.prisma

# Start the application
CMD ["node", "dist/apps/users/main"]
