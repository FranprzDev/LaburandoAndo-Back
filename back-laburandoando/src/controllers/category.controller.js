const Category = require("../models/category.model");

const createCategory = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      data: null,
      error: "El nombre es requerido.",
    });
  }

  try {
    const category = new Category({
      name: name,
    });

    await category.save();
    res.status(201).json({
      data: null,
      error: null,
    });
  } catch (error) {
    console.error("Error al crear la categoría:", error);
    res.status(500).json({
      data: null,
      error: "Ha ocurrido un error al crear la categoría.",
    });
  }
};

const getCategories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const categories = await Category.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json({
      data: categories,
      error: null,
    });
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    res.status(500).json({
      data: null,
      error: "Ha ocurrido un error al obtener las categorías.",
    });
  }
};

const getCategoriesById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      data: null,
      error: "El id es requerido.",
    });
  }

  try {
    const category = await Category.findById(id);
    res.status(200).json({
      data: category,
      error: null,
    });
  } catch (error) {
    console.error("Error al obtener la categoría:", error);
    res.status(500).json({
      data: null,
      error: "Ha ocurrido un error al obtener la categoría.",
    });
  }
};

const getCategoriesByName = async (req, res) => {
    const { name } = req.params;

    if (!name) {
        return res.status(400).json({
            data: null,
            error: "El nombre es requerido.",
        });
    }

    try {
        const categories = await Category.find({ name: { $regex: name, $options: "i" } });
        res.status(200).json({
            data: categories,
            error: null,
        });
    } catch (error) {
        console.error("Error al obtener las categorías:", error);
        res.status(500).json({
            data: null,
            error: "Ha ocurrido un error al obtener las categorías.",
        });
    }
};

module.exports = {
  createCategory,
  getCategories,
  getCategoriesById,
  getCategoriesByName,
};
