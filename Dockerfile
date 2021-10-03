FROM node:14-alpine AS build

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./

RUN npm run build && npm prune --production

FROM node:14-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/dist /app/dist
COPY --from=build /app/node_modules /app/node_modules

EXPOSE 4000

CMD node dist/main.js
