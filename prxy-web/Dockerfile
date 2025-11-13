# Usa una imagen base de Node.js (elige la versión que necesites)
FROM node:18-alpine

# Define el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json (si lo tienes)
COPY backend/package*.json ./

# Instala las dependencias de Node.js
RUN npm install

# Copia el resto de los archivos del backend al contenedor
COPY backend/. ./

# Expone el puerto en el que tu aplicación escucha (por defecto 3000)
EXPOSE 3000

# Define el comando para iniciar la aplicación
CMD ["npm", "start"]
