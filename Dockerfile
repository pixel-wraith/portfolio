# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:22-alpine AS production

WORKDIR /app

# Copy built application and production dependencies
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the port
EXPOSE 3000

# Run the application
CMD ["node", "build"]
