# Utiliza una imagen base oficial de Node.js
FROM node:18-alphine

# Establece el directorio de trabajo en la imagen de Docker
WORKDIR src/app

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
