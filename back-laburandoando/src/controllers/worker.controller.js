/* CRUD de trabajadores */

const Worker = require("../models/worker.model");
const { validationResult } = require("express-validator");
const { expressValidations } = require("../middlewares/common.validations");

const createWorker = async (req, res) => {
  const { fullname, dni, email, phone, address, birthdate } = req.body;

  try {
    const worker = new Worker({
      fullname: fullname,
      dni: dni,
      email: email,
      phone: phone,
      address: address,
      birthdate: birthdate,
    });

    await worker.save();
    res.status(201).json({
      data: [],
      error: ["Trabajador creado exitosamente."],
    });
  } catch (error) {
    console.error("Error al crear el trabajador:", error);
    res.status(500).json({
      data: [],
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
      data: [],
      error: ["Ha ocurrido un error al obtener los trabajadores."],
    });
  }
};

const getWorkerById = async (req, res) => {
  const { id } = req.params;

  try {
    const worker = await Worker.findById(id);
    res.status(200).json({
      data: worker,
      error: [],
    });
  } catch (error) {
    console.error("Error al obtener el trabajador:", error);
    res.status(500).json({
      data: [],
      error: ["Ha ocurrido un error al obtener el trabajador."],
    });
  }
};

const getWorkerByName = async (req, res) => {
  const { fullname } = req.params;

  try {
    const worker = await Worker.findOne({ fullname: fullname });
    res.status(200).json({
      data: worker,
      error: [],
    });
  } catch (error) {
    console.error("Error al obtener el trabajador:", error);
    res.status(500).json({
      data: [],
      error: ["Ha ocurrido un error al obtener el trabajador."],
    });
  }
};

const updateWorker = async (req, res) => {
  const { id } = req.params;
  const { email, phone, address, birthdate, img } = req.body;

  if (!id) {
    return res.status(400).json({
      data: [],
      error: ["El id es requerido."],
    });
  }

  try {
    const worker = await Worker.findByIdAndUpdate(
      id,
      {
        email: email,
        phone: phone,
        address: address,
        birthdate: birthdate,
        img: img,
      },
      { new: true }
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
      data: [],
      error: ["El id es requerido."],
    });
  }

  try {
    await Worker.findByIdAndDelete(id);
    res.status(200).json({
      data: [],
      error: ["Trabajador eliminado exitosamente."],
    });
  } catch (error) {
    console.error("Error al eliminar el trabajador:", error);
    res.status(500).json({
      data: [],
      error: ["Ha ocurrido un error al eliminar el trabajador."],
    });
  }
};

module.exports = {
    createWorker,
    getWorkers,
    getWorkerById,
    getWorkerByName,
    updateWorker,
}