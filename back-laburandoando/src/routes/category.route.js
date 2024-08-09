const express = require("express");
const {
  createCategory,
  getCategories,
  getCategoriesByName,
  getCategoriesById,
} = require("../controllers/category.controller");
const { expressValidations } = require("../middlewares/common.validations");
const {
  idParamValidations,
  paramNameCategoryValidations,
  bodyNameCategoryValidations,
} = require("../common/expressValidations");

const categoryRouter = express.Router();

categoryRouter.post(
  "/create",
  bodyNameCategoryValidations,
  expressValidations,
  createCategory
);

categoryRouter.get("/", expressValidations, getCategories);

categoryRouter.get(
  "/:id",
  idParamValidations,
  expressValidations,
  getCategoriesById
);

categoryRouter.get(
  "/find-by-name/:name",
  paramNameCategoryValidations,
  expressValidations,
  getCategoriesByName
);

module.exports = categoryRouter;
