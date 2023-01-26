# pull official base image
FROM node:16-alpine
WORKDIR /app

ARG API_URL
ENV REACT_APP_API_URL=$API_URL

COPY package.json package-lock.json ./
RUN npm install
COPY . .

# Build for production.
RUN npm run build --production

# Install `serve` to run the application.
RUN npm install -g serve

# Uses port which is used by the actual application
EXPOSE 3000

# Run application
CMD [ "npm", "run", "serve" ]
