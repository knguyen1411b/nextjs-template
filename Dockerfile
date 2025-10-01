# --------------------------
# Stage 1: Base image
# --------------------------
FROM node:18-alpine AS base
WORKDIR /app

# Install required build tools (for some Node.js native modules)
RUN apk add --no-cache g++ make py3-pip libc6-compat

# Copy only package.json (no package-lock.json for flexibility)
COPY package.json ./

# --------------------------
# Stage 2: Dependencies
# --------------------------
FROM base AS deps

# Install dependencies (no lock file -> fresh install each build)
RUN npm install

# --------------------------
# Stage 3: Builder
# --------------------------
FROM base AS builder

# Copy installed dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy all source code into builder container
COPY . .

# Build Next.js application
RUN npm run build

# --------------------------
# Stage 4: Production
# --------------------------
FROM node:18-alpine AS prod
WORKDIR /app

ENV NODE_ENV=production

# Copy only required build outputs and runtime dependencies
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Create a non-root user for better security
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
USER nextjs

# Expose Next.js default port
EXPOSE 3000

# Start Next.js in production mode
CMD ["npm", "run", "start"]

# --------------------------
# Stage 5: Development
# --------------------------
FROM base AS dev
WORKDIR /app

ENV NODE_ENV=development

# Copy all project files for development
COPY . .

# Install dependencies (again, no lock file)
RUN npm install

# Expose port for Next.js dev server
EXPOSE 3000

# Run Next.js in development mode
CMD ["npm", "run", "dev"]
