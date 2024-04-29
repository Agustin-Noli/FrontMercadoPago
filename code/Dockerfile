FROM node:lts-alpine as build-stage
ARG compilacion=staging
WORKDIR /app
COPY code/package*.json ./
RUN npm install --legacy-peer-deps
COPY code/. .
RUN npm run build -- --mode ${compilacion}

# etapa de producción
FROM nginx:1.22.0-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html/app_ms
COPY code/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]