const Work = require("../models/work.model");

const createWork = async (req, res) => {
  const { name, description, PricePerHour, category, worker } = req.body;

  try {
    const work = new Work({
      name: name,
      description: description,
      PricePerHour: PricePerHour,
      category: category,
      worker: worker,
    });

    await work.save();
    res.status(201).json({
      data: [],
      error: ["Trabajo creado exitosamente."],
    });
  } catch (error) {
    console.error("Error al crear el trabajo:", error);
    res.status(500).json({
      data: [],
      error: ["Ha ocurrido un error al crear el trabajo."],
    });
  }
};

const getWorks = async (req, res) => {
    const { page, limit } = req.query;

    try {
        const works = await Work.find()
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        res.status(200).json({
            data: works,
            error: [],
        });
    } catch (error) {
        console.error("Error al obtener los trabajos:", error);
        res.status(500).json({
            data: [],
            error: ["Ha ocurrido un error al obtener los trabajos."],
        });
    }
};

const getWorkByCategory = async (req, res) => {
    const { category } = req.params;
    const { page, limit } = req.query;

    try {
        const works = await Work.find({ category: category })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        res.status(200).json({
            data: works,
            error: [],
        });
    } catch (error) {
        console.error("Error al obtener los trabajos por categoría:", error);
        res.status(500).json({
            data: [],
            error: ["Ha ocurrido un error al obtener los trabajos por categoría."],
        });
    }
};

module.exports = {
    createWork,
    getWorks,
    getWorkByCategory,
}