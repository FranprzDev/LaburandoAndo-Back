const express = require("express");
const { reviewValidations, reviewValidationsGet, idParamValidations } = require("../common/expressValidations");
const { addComment, getAllComments, deleteReview } = require("../controllers/review.controller");
const { expressValidations } = require("../middlewares/common.validations");
const reviewRouter = express.Router();


reviewRouter.put("/:idWork",
    reviewValidations,
    addComment,
);

reviewRouter.delete(
    "/delete/:id",
    idParamValidations,
    expressValidations,
    deleteReview
  );

module.exports = reviewRouter