const express = require("express");
const { reviewValidations, reviewValidationsGet } = require("../common/expressValidations");
const { addComment, getAllComments } = require("../controllers/review.controller");
const reviewRouter = express.Router();


reviewRouter.put("/:idWork",
    reviewValidations,
    /* Falta una validación para saber si el usuario tiene activo actualmente un trabjao con esa persona */
    addComment
);


module.exports = reviewRouter