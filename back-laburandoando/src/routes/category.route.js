const express = require("express");
const {
  createCategory,
  getCategories,
  getCategoriesByName,
  getCategoriesById,
  deleteCategory,
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

categoryRouter.delete(
  "/delete/:id",
  idParamValidations,
  expressValidations,
  deleteCategory
);

module.exports = categoryRouter;
