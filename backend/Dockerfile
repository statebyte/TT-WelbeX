FROM node:21-alpine AS build
WORKDIR /app

# Copy relevant files
COPY package.json pnpm-lock.yaml ./
COPY tsconfig.json ./
COPY src ./src

# Install pnpm and dependencies
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile

# Build
RUN pnpm build

FROM node:21-alpine
WORKDIR /app

# Copy build artifacts and re-install deps in production
COPY --from=build /app/dist ./dist
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile --prod

EXPOSE 3001
CMD ["node", "dist/server.js"]