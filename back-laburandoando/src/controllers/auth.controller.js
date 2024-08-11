const { JWT_SECRET } = require("../common/constants");
const { comparePassword, cryptPassword } = require("../common/functions");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const Worker = require("../models/worker.model");

const jwtRegisterClient = async (req, res) => {
    const { fullname, mail, password, img  } = req.body;
    
    try {
        const user = await User.findOne({ mail });

        if (user) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        const newUser = new User({
            mail,
            password: cryptPassword(password),
            fullname,
            img: img ? img : "https://media.discordapp.net/attachments/1271548261097934871/1271583466768564368/Imagen_de_WhatsApp_2024-08-09_a_las_18.37.56_612a8ac6.jpg?ex=66b7dde3&is=66b68c63&hm=56f0c7645bf3ca0e1028530d01f492ba11269c4f9b28ecf75f1a24f9e7da0f65&=&format=webp&width=676&height=676"
        });

        await newUser.save();

        return res.status(201).json({ data: newUser, error: null });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ data: "No se pudo crear el usuario", error: null });
    }
}

const jwtRegisterWorker = async (req, res) => {
    const { 
        fullname, 
        mail, 
        password,
        img,
        phone,
        adress
    } = req.body;

    try {
        const user = await User.findOne({ mail }); 
        
        if (user) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        const newUser = new Worker({
            mail,
            password: cryptPassword(password),
            fullname,
            phone: phone === "" ? phone : "",
            adress: adress === "" ? adress : "",
            img: img === "" ? img : "https://media.discordapp.net/attachments/1271548261097934871/1271583466768564368/Imagen_de_WhatsApp_2024-08-09_a_las_18.37.56_612a8ac6.jpg?ex=66b7dde3&is=66b68c63&hm=56f0c7645bf3ca0e1028530d01f492ba11269c4f9b28ecf75f1a24f9e7da0f65&=&format=webp&width=676&height=676"
        });

        await newUser.save();

        return res.status(201).json({ data: newUser, error: null });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Hubo un error al crear el trabajador" });
    }
}

const jwtLogin = async (req, res) => {
  const { mail, password } = req.body;

  try {
    const user = await User.findOne({ mail });

    if (!user) {
      return res.status(401).json({ message: "Credenciales invalidas." });
    }

    const isValid = await comparePassword(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: "Credenciales invalidas." });
    }

    console.log(user);

    const token = jwt.sign(
      {
        user: {
          _id: user._id,
          fullname: user.fullname,
          mail: user.mail,
          img: user.img,
          role: user.role || "client",
        },
        sub: user.mail,
      },
      JWT_SECRET
    );
    return res.status(200).json({ data: { token } });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Algo salio mal" });
  }
};

module.exports = {
  jwtLogin,
  jwtRegisterClient,
  jwtRegisterWorker,
};
