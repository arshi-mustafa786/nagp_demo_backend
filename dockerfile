# ---- Build stage ----
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .

# ---- Runtime stage ----
FROM node:20-slim
WORKDIR /home/node/app
COPY --from=builder /app ./
USER node
EXPOSE 3000
CMD ["node", "app.js"] # Or your main file
