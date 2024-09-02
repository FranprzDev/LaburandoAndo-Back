const { body, param } = require("express-validator");

const createWorkValidations = [
  param("id").isMongoId(),
  body("categoryId").optional().isMongoId(),
  body("location").optional().isString(),
  body("title").isString(),
  body("description").isString(),
  body("price").isNumeric(),
];

const idParamValidations = [param("id").isMongoId()];

const idAndCategoryValidations = [
  param("id").isMongoId(),
  body("categoryId").isMongoId(),
];

const createWorkerValidations = [
    body("fullname").isString(),
    body("mail").isString(),
    body("phone").isString(),
    body("address").isString(),
]

const paramNameCategoryValidations = [
    param("name").isString(),
]

const bodyNameCategoryValidations = [
    body("name").isString(),
]

const reviewValidations = [
  param("idWork").isMongoId(),
  body("comment").isString(),
]

const reviewValidationsGet = [
  param("idWork").isMongoId(),
  param("idUser").isMongoId(),
]

const reviewValidationsGetFilter = [
  param("idWork").isMongoId(),
  param("stars").isNumeric(),
]

const updateValidations = [
  param("id").isMongoId(),
  body("categoryId").optional().isMongoId(),
  body("location").optional().isString(),
  body("title").isString(),
  body("description").isString(),
  body("pricePerHour").isNumeric(),
]

const bodyFeedBackValidations = [
  body("subject").isString(),
  body("message").isString(),
  param("id").isMongoId(),
];

module.exports = {
  createWorkValidations,
  idParamValidations,
  idAndCategoryValidations,
  createWorkerValidations,
  paramNameCategoryValidations,
  bodyNameCategoryValidations,
  reviewValidations,
  reviewValidationsGet,
  reviewValidationsGetFilter,
  updateValidations,
  bodyFeedBackValidations,
};
