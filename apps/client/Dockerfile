FROM node:20.12.2-alpine3.19 as build
WORKDIR /app
ARG VITE_API_ENDPOINT_URL
COPY package*.json ./
RUN npm install
COPY . .
RUN VITE_API_ENDPOINT_URL=$VITE_API_ENDPOINT_URL npm run build

FROM nginx:1.21.3-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80