const Review = require("../models/review.model");

const addComment = async (req, res) => {
  const { idWork } = req.params;
  const { comment, stars, userId } = req.body;

  if (!idWork || !userId) {
    return res.status(400).json({
      data: null,
      error: ["Los id son requeridos."],
    });
  }

  if (!comment) comment = "";
  if (!stars)
    return res.status(400).json({
      data: null,
      error: ["Las estrellas son requeridas."],
    });

  try {
    await Review.create({
      stars,
      comment,
      user: userId,
      work: idWork,
    });

    res.status(200).json({
      data: null,
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      error: ["Ha ocurrido un error al agregar el comentario."],
    });
  }
};

module.exports = {
  addComment,
};
