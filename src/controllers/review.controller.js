const Review = require("../models/review.model");
const Work = require("../models/work.model");

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
    const review = new Review({
      stars,
      comment,
      user: userId,
      work: idWork,
    });

    await review.save();

    await Work.findByIdAndUpdate(idWork, {
      $push: { reviews: review._id },
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

const deleteReview = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      data: null,
      error: "El id es requerido.",
    });
  }

  try {
    await Review.findByIdAndDelete(id);
    res.status(204).json({
      data: null,
      error: null,
    });
  } catch (error) {
    console.error("Error al eliminar el comentario:", error);
    res.status(500).json({
      data: null,
      error: "Ha ocurrido un error al eliminar el comentario.",
    });
  }
};

module.exports = {
  addComment,
  deleteReview
};
