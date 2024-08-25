const Work = require("../models/work.model");
const Worker = require("../models/worker.model");

const createWork = async (req, res) => {
  const { id } = req.params;
  const { title, description, price, categoryId, currency } = req.body;

  console.log("work:", req.body);

  if (!title || !description || !price || !id) {
    return res.status(400).json({
      data: null,
      error: ["Debe completar todos los campos."],
    });
  }

  const worker = await Worker.findById(id);

  if (!worker) {
    return res.status(404).json({
      data: null,
      error: ["No se encontró el trabajador."],
    });
  }

  try {
    const work = new Work({
      title: title,
      description: description,
      pricePerHour: price,
      currency: currency ? currency : "ARS",
      category: categoryId,
      worker: id,
    });

    await work.save();
    res.status(201).json({
      data: null,
      error: null,
    });

    await Worker.findByIdAndUpdate(id, {
      $push: { works: work._id },
    });

  } catch (error) {
    console.error("Error al crear el trabajo:", error);
    res.status(500).json({
      data: null,
      error: ["Ha ocurrido un error al crear el trabajo."],
    });
  }
};

const getWorks = async (req, res) => {
  const { id } = req.params;
  const { page, limit } = req.query;

  try {
    if (id) {
      const work = await Work.findById(id)
      .populate("category")
      .populate("worker")
      .populate("reviews");

      if (!work) {
        return res.status(404).json({
          data: null,
          error: ["No se encontró el trabajo."],
        });
      }

      return res.status(200).json({
        data: work,
        error: null,
      });
    }

      
    const works = await Work.find()
      .populate("category")
      .populate("worker")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.status(200).json({
      data: works,
      error: null,
    });
  } catch (error) {
    console.error("Error al obtener los trabajos:", error);
    res.status(500).json({
      data: null,
      error: ["Ha ocurrido un error al obtener los trabajos."],
    });
  }
};

const getWorkByCategory = async (req, res) => {
  const { idCategory } = req.params;
  const { page, limit } = req.query;

  if (!idCategory)
    return res.status(400).json({
      data: null,
      error: ["Debe ingresar una categoría."],
    });

  try {
    const works = await Work.find({ category: idCategory })
      .populate("category")
      .populate("worker")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.status(200).json({
      data: works,
      error: null,
    });
  } catch (error) {
    console.error("Error al obtener los trabajos por categoría:", error);
    res.status(500).json({
      data: null,
      error: ["Ha ocurrido un error al obtener los trabajos por categoría."],
    });
  }
};

const getWorkByLocation = async (req, res) => {
  const { location } = req.params;
  const { page, limit } = req.query;

  if (!location)
    return res.status(400).json({
      data: null,
      error: ["Debe ingresar una ubicación."],
    });

  try {
    const works = await Work.find({ location: { $regex: location, $options: 'i' } })
      .populate("category")
      .populate("worker")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.status(200).json({
      data: works,
      error: null,
    });
  } catch (error) {
    console.error("Error al obtener los trabajos por ubicación:", error);
    res.status(500).json({
      data: null,
      error: ["Ha ocurrido un error al obtener los trabajos por ubicación."],
    });
  }
};

const changeCategoryWork = async (req, res) => {
  const { id } = req.params;
  const { categoryId } = req.body;

  if (!id || !categoryId)
    return res.status(400).json({
      date: null,
      error: ["Debe ingresar un id y una categoría."],
    });

  try {
    const work = await Work.findById(id);
    if (!work)
      return res.status(404).json({
        data: null,
        error: ["No se encontró el trabajo."],
      });

    work.category.push(categoryId);
    await work.save();

    res.status(200).json({
      data: null,
      error: null,
    });
  } catch (error) {
    console.error("Error al cambiar la categoría del trabajo:", error);
    res.status(500).json({
      data: null,
      error: ["Ha ocurrido un error al cambiar la categoría del trabajo."],
    });
  }
};

const changeAdvice = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  if (!id)
    return res.status(400).json({
      data: null,
      error: ["Debe ingresar un id."],
    });

  try {
    const work = await Work.findById(id);

    if (!work)
      return res.status(404).json({
        data: null,
        error: ["No se encontró el trabajo."],
      });

    if (name) work.name = name;
    if (description) work.description = description;

    await work.save();
    res.status(214).json({
      data: null,
      error: null,
    });
  } catch (error) {
    console.error("Error al cambiar el consejo:", error);
    res.status(500).json({
      data: null,
      error: ["Ha ocurrido un error al cambiar el consejo."],
    });
  }
};

const changeStatusWork = async (req, res) => {
  const { id } = req.params;

  if (!id)
    return res.status(400).json({
      data: null,
      error: ["Debe ingresar un id."],
    });

  try {
    const work = await Work.findById(id);
    if (!work)
      return res.status(404).json({
        data: null,
        error: ["No se encontró el trabajo."],
      });

    work.isActive = !work.isActive;
    await work.save();
    res.status(214).json({
      data: null,
      error: null,
    });
  } catch (error) {
    console.error("Error al cambiar el estado del trabajo:", error);
    res.status(500).json({
      data: null,
      error: ["Ha ocurrido un error al cambiar el estado del trabajo."],
    });
  }
};

const deleteWork = async (req, res) => {
  const { id } = req.params;

  if (!id)
    return res.status(400).json({
      data: null,
      error: ["Debe ingresar un id."],
    });

  try {
    const work = await Work.findOneAndDelete({ _id: id });
    if (!work)
      return res.status(404).json({
        data: null,
        error: ["No se encontró el trabajo."],
      });

    res.status(214).json({
      data: null,
      error: null,
    });
  } catch (error) {
    console.error("Error al eliminar el trabajo:", error);
    res.status(500).json({
      data: null,
      error: ["Ha ocurrido un error al eliminar el trabajo."],
    });
  }
};

module.exports = {
  createWork,
  getWorks,  
  getWorkByCategory,
  getWorkByLocation,
  changeCategoryWork,
  changeAdvice,
  changeStatusWork,
  deleteWork,
};
