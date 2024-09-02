# Utiliza una imagen base oficial de Node.js
FROM alpine:3.19

# Instalar Node.js y npm
RUN apk add --no-cache nodejs npm
# Establece el directorio de trabajo en la imagen de Docker
WORKDIR app

# Copia los archivos package.json y package-lock.json para instalar dependencias
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código de la aplicación al contenedor
COPY . .

# Exponer el puerto que la aplicación utiliza (por defecto 3000, ajústalo si es diferente)
EXPOSE 3000

# Comando para correr la aplicación
CMD ["node", "index.js"]
