FROM node:20.12.2-alpine3.19 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:20.12.2-alpine3.19
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/package*.json ./
RUN npm install --omit=dev
CMD ["npm", "start"]
EXPOSE 3000