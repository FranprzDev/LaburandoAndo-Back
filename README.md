# 🛠️ LaburandoAndo — Backend API

API REST para la plataforma y portal de empleo **LaburandoAndo**, desarrollada para gestionar postulaciones laborales, publicación de avisos, autenticación segura y perfiles de usuarios. Proyecto formativo de **RollingCode School**.

## 🚀 Características Principales
- **Autenticación y Autorización**: JSON Web Tokens (JWT), sesiones seguras, hashing con Bcrypt y soporte de estrategias con Passport (Local y GitHub OAuth).
- **Gestión de Roles**: Permisos diferenciados para postulantes y reclutadores.
- **Publicación y Búsqueda Laboral**: Endpoints RESTful para la creación, actualización y consulta de ofertas de empleo.
- **Validación de Datos**: Control estricto de esquemas y payloads con `express-validator`.
- **Persistencia NoSQL**: Modelado de datos escalable con MongoDB y Mongoose.

## 🛠️ Stack Tecnológico
- **Node.js** & **Express.js**
- **MongoDB** & **Mongoose ODM**
- **JWT (JSON Web Tokens)** & **Bcrypt**
- **Passport.js** (Estrategias de autenticación)
- **CORS**, **Morgan** (Logging) y **Dotenv**

## ⚙️ Configuración y Ejecución
1. Clona el repositorio:
   ```bash
   git clone https://github.com/FranprzDev/LaburandoAndo-Back.git
   cd LaburandoAndo-Back
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura tus variables de entorno creando un archivo `.env` basado en `.env.example`:
   ```env
   PORT=8080
   MONGODB_URI=tu_conexion_mongodb
   JWT_SECRET=tu_secreto
   ```
4. Inicia en modo desarrollo:
   ```bash
   npm run dev
   ```
