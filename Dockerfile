FROM node:16-alpine as builder
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci

# Build the app
RUN npm run build

# Bundle static assets with nginx
FROM nginx:stable-alpine as production
# Copy built assets from `builder` image
COPY --from=builder /app/build /usr/share/nginx/html

# Copy configs
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY .env.example .env

# Install runtime-env-cra
RUN apk add --update nodejs
RUN apk add --update npm
RUN npm install -g runtime-env-cra

# Expose port
EXPOSE 3000

# Start nginx
CMD ["/bin/sh", "-c", "runtime-env-cra && nginx -g \"daemon off;\""]
