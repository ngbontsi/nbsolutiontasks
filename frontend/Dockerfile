# __define-ocg__ Frontend Dockerfile (React + Vite)
# Stage 1: build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: serve
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Expose port 80 for frontend
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
