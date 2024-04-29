# micro-frontend

## Tener en cuenta para desplegar en CICD

- En los archivos .env revisar la variable "VITE_BASE_URL"
- En el Dockerfile agregarle el base cuando hace la copia de archivos.
- En el Nginx.conf modificar el location para el nombre base.
- En el archivo vite.config.js, revisar la variable "base"
- Cambiar en code/src/layout/MasterPage.vue La linea 27. Nombre del localstorage de version
