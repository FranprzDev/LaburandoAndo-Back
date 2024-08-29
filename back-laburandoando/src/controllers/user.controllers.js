const { cryptPassword } = require("../common/functions");
const Review = require("../models/review.model");
const User = require("../models/user.model");
const Work = require("../models/work.model");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      data: users,
      error: [],
    });
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    res.status(500).json({
      data: null,
      error: ["Ha ocurrido un error al obtener los usuarios."],
    });
  }
};

const updateImg = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      data: null,
      error: ["El id es requerido."],
    });
  }

  const { img } = req.body;

  try {
    await User.findByIdAndUpdate(
      id,
      {
        img: img,
      },
      { new: true }
    );

    res.status(200).json({
      data: null,
      error: [],
    });
  } catch (error) {
    res.status(500).json({
      date: null,
      error: ["Ha ocurrido un error al actualizar la imagen del usuario."],
    });
  }
};

const updatePassword = async (req, res) => {
  const { id } = req.params

  if(!id) {
    return res.status(400).json({
      data: null,
      error: ["El id es requerido."]
    })
  }

  const { password } = req.body

  try {
    await User.findByIdAndUpdate(
      id,
      {
        password: cryptPassword(password)
      },
      { new: true }
    )

    return res.status(200).json({
      data: null,
      error: []
    })
  } catch (error)
  {
    res.status(500).json({
      data: null,
      error: ["Ha ocurrido un error al actualizar la contraseña del usuario."]
    })
  }
}

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      data: null,
      error: "El id es requerido.",
    });
  }

  try {
    await User.findByIdAndDelete(id);
    res.status(204).json({
      data: null,
      error: null,
    });
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    res.status(500).json({
      data: null,
      error: "Ha ocurrido un error al eliminar el usuario.",
    });
  }
};

module.exports = {
  getUsers,
  updateImg,
  updatePassword,
  deleteUser
};
