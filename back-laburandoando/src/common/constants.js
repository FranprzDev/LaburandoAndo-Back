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

const defaultImg = "https://media.discordapp.net/attachments/1271548261097934871/1271583466768564368/Imagen_de_WhatsApp_2024-08-09_a_las_18.37.56_612a8ac6.jpg?ex=66b7dde3&is=66b68c63&hm=56f0c7645bf3ca0e1028530d01f492ba11269c4f9b28ecf75f1a24f9e7da0f65&=&format=webp&width=676&height=676"


module.exports = {
    JWT_SECRET,
    categoryArray,
    userArray,
    workerArray,
    defaultImg,
}