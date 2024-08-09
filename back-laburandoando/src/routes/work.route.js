const express = require("express");
const { getWorks, createWork, getWorkByLocation, getWorkByCategory, changeCategoryWork, deleteWork, changeStatusWork, changeAdvice } = require("../controllers/work.controller");
const { expressValidations } = require("../middlewares/common.validations");
const { createWorkValidations, idParamValidations, idAndCategoryValidations } = require("../common/expressValidations");
const workRouter = express.Router();

workRouter.get("/", getWorks);
workRouter.get("/:id", getWorks);
workRouter.get("/category/:idCategory", getWorkByCategory);
workRouter.get("/location/:location", getWorkByLocation);
workRouter.post("/:id", createWorkValidations, expressValidations, createWork);
workRouter.patch("/category/:id", idAndCategoryValidations, expressValidations, changeCategoryWork);
workRouter.patch("/advice/:id", idParamValidations, expressValidations, changeAdvice);
workRouter.patch("/status/:id", idParamValidations, expressValidations, changeStatusWork);
workRouter.delete("/:id", idParamValidations, expressValidations, deleteWork);

module.exports = workRouter;