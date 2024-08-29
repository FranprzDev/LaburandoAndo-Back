const express = require("express");
const { reviewValidations, reviewValidationsGet, idParamValidations } = require("../common/expressValidations");
const { addComment, getAllComments, deleteReview } = require("../controllers/review.controller");
const { expressValidations } = require("../middlewares/common.validations");
const reviewRouter = express.Router();


reviewRouter.put("/:idWork",
    reviewValidations,
    /* Falta una validación para saber si el usuario tiene activo actualmente un trabjao con esa persona */
    addComment,
);

reviewRouter.delete(
    "/delete/:id",
    idParamValidations,
    expressValidations,
    deleteReview
  );

module.exports = reviewRouter