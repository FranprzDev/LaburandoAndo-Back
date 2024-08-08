const express = require("express");
const { createCategory, getCategories, getCategoriesByName, getCategoriesById } = require("../controllers/category.controller");

const { body, param } = require("express-validator");
const { expressValidations } = require("../middlewares/common.validations");
// const { verifyJWT } = require("../middlewares/auth.validations");

const categoryRouter = express.Router();

categoryRouter.post(
  "/create",
  // verifyJWT,
  body("name").isString(),
  expressValidations,
  createCategory
);

categoryRouter.get("/get-all",  
  expressValidations,
  getCategories,
);

categoryRouter.get("/get-by-id/:id",
  param("id").isMongoId(),
  expressValidations,
  getCategoriesById
);

categoryRouter.get("/find-by-name/:name",
  param("name").isString(),
  expressValidations,
  getCategoriesByName
);

module.exports = categoryRouter;
