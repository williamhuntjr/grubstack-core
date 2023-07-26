FROM node:16-alpine as builder
# Set the working directory to /app inside the container
WORKDIR /app
# Copy app files
COPY . .
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci

ARG BUILD_ENV=production
ENV NODE_ENV=$BUILD_ENV

# Build the app
RUN npm run build

# Bundle static assets with nginx
FROM nginx:stable-alpine as production
# Copy built assets from `builder` image
COPY --from=builder /app/build /usr/share/nginx/html

# Copy configs
COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

COPY .env.example .env
COPY ./env.sh .

# Add bash
RUN apk add --no-cache bash

# Make our shell script executable
RUN chmod +x env.sh

# Expose port
EXPOSE 3000

# Start nginx
CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
