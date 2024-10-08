const Worker = require("../models/worker.model");
const { cryptPassword } = require("../common/functions");
const User = require("../models/user.model");
const Work = require("../models/work.model");

const createWorker = async (req, res) => {
  const { fullname, mail, img, password, phone, address, outstanding, local } = req.body;

  try {
    const worker = new Worker({
      fullname: fullname,
      mail: mail,
      phone: phone,
      address: address,
      password: cryptPassword(password),
      img: img,
      outstanding: outstanding ? outstanding : false,
      local: local ? local : false,
    });

    await worker.save();
    res.status(201).json({
      data: null,
      error: null,
    });
  } catch (error) {
    console.error("Error al crear el trabajador:", error);
    res.status(500).json({
      data: null,
      error: ["Ha ocurrido un error al crear el trabajador."],
    });
  }
};

const getWorkers = async (req, res) => {
  try {
    const workers = await Worker.find();
    res.status(200).json({
      data: workers,
      error: [],
    });
  } catch (error) {
    console.error("Error al obtener los trabajadores:", error);
    res.status(500).json({
      data: null,
      error: ["Ha ocurrido un error al obtener los trabajadores."],
    });
  }
};

const getWorkerById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      data: null,
      error: ["El id es requerido"],
    });
  }

  try {
    const worker = await Worker.findById(id).populate("works").populate({
      path: 'works',
      populate: {
        path: 'category',
        model: 'Category'
      }})

    res.status(200).json({
      data: worker,
      error: [],
    });
  } catch (error) {
    console.error("Error al obtener el trabajador:", error);
    res.status(500).json({
      data: null,
      error: ["Ha ocurrido un error al obtener el trabajador."],
    });
  }
};

const getWorkerByName = async (req, res) => {
  const { fullname } = req.params;

  if (!fullname)
    return res.status(400).json({
      data: null,
      error: ["El nombre es requerido"],
    });

  try {
    const worker = await Worker.find({
      fullname: { $regex: fullname, $options: "i" },
    });

    return res.status(200).json({
      data: worker,
      error: [],
    });
  } catch (error) {
    console.error("Error al obtener el trabajador:", error);
    res.status(500).json({
      data: null,
      error: ["Ha ocurrido un error al obtener el trabajador."],
    });
  }
};

const updateWorker = async (req, res) => {
  const { id } = req.params;
  const { mail, phone, address, img } = req.body;

  try {
    const worker = await Worker.findByIdAndUpdate(
      id,
      {
        mail: mail,
        phone: phone,
        address: address,
        img: img,
      }
    );
    res.status(200).json({
      data: worker,
      error: [],
    });
  } catch (error) {
    console.error("Error al actualizar el trabajador:", error);
    res.status(500).json({
      data: [],
      error: ["Ha ocurrido un error al actualizar el trabajador."],
    });
  }
};

const deleteWorker = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      data: null,
      error: "El id es requerido.",
    });
  }

  try {
    const worker = await Worker.findById(id).populate('works');
    
    if (!worker) {
      return res.status(404).json({
        data: null,
        error: "No se encontró el trabajador.",
      });
    }

    await Work.deleteMany({ _id: { $in: worker.works } });

    await Worker.findByIdAndDelete(id);

    res.status(204).json({
      data: null,
      error: null,
    });
  } catch (error) {
    console.error("Error al eliminar el trabajador:", error);
    res.status(500).json({
      data: null,
      error: "Ha ocurrido un error al eliminar el trabajador.",
    });
  }
};

module.exports = {
  createWorker,
  getWorkers,
  getWorkerById,
  getWorkerByName,
  updateWorker,
  deleteWorker
};
