const FeedBack = require("../models/feedback.model");

const getFeedbacks = async (req, res) => {
  const { read } = req.query;

  try {
    const feedbacks = await FeedBack.find({ isRead: read }).populate("worker");
    return res.status(200).json({
      data: feedbacks,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      error: "Hubo un error en el servidor...",
    });
  }
};

const createFeedBack = async (req, res) => {
  const { subject, message } = req.body;

  const worker = req.params.id;
  if(!worker){
    return res.status(400).json({
      data: null,
      error: "No se encontró el trabajador...",
    });
  }

  try {
    const newFeedBack = new FeedBack({
      subject,
      message,
      worker,
    });

    await newFeedBack.save();

    return res.status(201).json({
      data: newFeedBack,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      error: "Hubo un error en el servidor...",
    });
  }
};

const changeReadState = async (req, res) => {
  const { id } = req.params;

  try {
    const feedback = await FeedBack.findById(id);

    if (!feedback) {
      return res.status(404).json({
        data: null,
        error: "No se encontró el feedback...",
      });
    }

    feedback.isRead = !feedback.isRead;
    await feedback.save();

    return res.status(200).json({
      data: feedback,
      error: null,
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      error: "Hubo un error en el servidor...",
    });
  }
};

const deleteFeedback = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      data: null,
      error: "El id es requerido.",
    });
  }

  try {
    await FeedBack.findByIdAndDelete(id);
    res.status(204).json({
      data: null,
      error: null,
    });
  } catch (error) {
    console.error("Error al eliminar el feedback:", error);
    res.status(500).json({
      data: null,
      error: "Ha ocurrido un error al eliminar el feedback.",
    });
  }
};

module.exports = {
  getFeedbacks,
  createFeedBack,
  changeReadState,
  deleteFeedback
};
