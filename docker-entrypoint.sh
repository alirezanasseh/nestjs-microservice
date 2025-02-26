#!/bin/sh
set -e

# Skip the prebuild step that tries to delete the dist directory
echo "Building shared libraries..."
npm run build shared-types --no-clean

# Start the application in development mode with nodemon
echo "Starting application..."
exec "$@"