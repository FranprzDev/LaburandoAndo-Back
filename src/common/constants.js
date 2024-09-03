require("dotenv").config()

const JWT_SECRET = process.env.JWT_SECRET;
const categoryArray = [
    {
        "name": "Carpintería",
    },
    {
        "name": "Electricidad",
    },
    {
        "name": "Plomería",
    },
    {
        "name": "Profesor particular",
    }, 
    {
        "name": "Cuidado de niños",
    }
]

const userArray = [
    {
        "fullname": "Juan Perez",
        "mail": "jauntest21@gmail.com",
    },
    {
        "fullname": "Maria Rodriguez",
        "mail": "maria@gmail.com",
        "password": "123456",
        "img": "",
    },
    {
        "fullname": "Pedro Martinez",
        "mail": "pedro@gmail.com",
        "password": "123456",
    },
    {
        "fullname": "Jose Gonzalez",
        "mail": "joseeeaaa@gmail.com",
        "password": "123456",
    }
]

const workerArray = [
    {
        "fullname": "Juan Perez",
        "mail": "juanWork@gmail.com",
        "password": "123456",
        "phone": "1234567890",
        "address": "Av. Siempre Viva 123"
    },
    {
        "fullname": "Maria Lopez",
        "mail": "marialopez@gmail.com",
        "password": "123456",
        "phone": "9876543210",
        "address": "Calle Principal 456"
    },
    {
        "fullname": "Carlos Sanchez",
        "mail": "carlossanchez@gmail.com",
        "password": "123456",
        "phone": "5555555555",
        "address": "Avenida Central 789"
    },
    {
        "fullname": "Laura Gomez",
        "mail": "lauragomez@gmail.com",
        "password": "123456",
        "phone": "1111111111",
        "address": "Plaza Mayor 123"
    }
]

const defaultImg = "https://res.cloudinary.com/dh4b6g2ld/image/upload/fl_preserve_transparency/v1725326098/Logo_ghomu4.jpg?_s=public-apps"


module.exports = {
    JWT_SECRET,
    categoryArray,
    userArray,
    workerArray,
    defaultImg,
}