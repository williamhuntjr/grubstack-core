FROM node:16-alpine as builder
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci

# Enforce runtime-env-cra
RUN npm install -g runtime-env-cra

# Build the app
RUN npm run build

# Bundle static assets with nginx
FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
# Copy built assets from `builder` image
COPY --from=builder /app/build /usr/share/nginx/html
# Add your nginx.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY .env.example .env

# Expose port
EXPOSE 3000

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html

# Start nginx
CMD ["/bin/sh", "-c", "runtime-env-cra && nginx -g \"daemon off;\""]
