FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Build Vite app
RUN npm run build

# Expose preview port (5173 is Vite default)
EXPOSE 5173

# Serve built app
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
