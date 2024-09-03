const { JWT_SECRET, defaultImg } = require("../common/constants");
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
            img: img ? img : "https://asset.cloudinary.com/dh4b6g2ld/09d204f015420e4d017ad076b31d10f4"
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
            phone: phone || "",
            adress: adress || "",
            img: img || defaultImg
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
    const user = await User.findOne({ mail: mail });

    if (!user) {
      return res.status(401).json({ message: "Credenciales invalidas." });
    }

    const isValid = await comparePassword(password, user.password);

    if (!isValid) {
      return res.status(401).json({ message: "Credenciales invalidas." });
    }
    
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
