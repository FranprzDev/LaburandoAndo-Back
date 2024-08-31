const express = require("express");
const { expressValidations } = require("../middlewares/common.validations");
const {
  idParamValidations,
  bodyFeedBackValidations,
} = require("../common/expressValidations");
const { getFeedbacks, changeReadState, createFeedBack, deleteFeedback } = require("../controllers/feedBacks.controller");

const feedBackRouter = express.Router();

feedBackRouter.get("/",
    expressValidations,
    getFeedbacks
);

feedBackRouter.patch("/:id",
    idParamValidations,
    expressValidations,
    changeReadState
);

feedBackRouter.post("/:id",
    bodyFeedBackValidations,
    expressValidations,
    createFeedBack
);

feedBackRouter.delete(
    "/delete/:id",
    idParamValidations,
    deleteFeedback
  );

module.exports = feedBackRouter;
