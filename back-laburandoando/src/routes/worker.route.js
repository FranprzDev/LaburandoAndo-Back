const express = require("express");
const {
  getWorkers,
  createWorker,
  getWorkerById,
  getWorkerByName,
  updateWorker,
  updateWorkerImg,
} = require("../controllers/worker.controller");
const { body, param } = require("express-validator");
const { expressValidations } = require("../middlewares/common.validations");

const workerRouter = express.Router();

workerRouter.post(
  "/create",
  body("fullname").isString(),
  body("mail").isString(),
  body("phone").isString(),
  body("address").isString(),
  expressValidations,
  createWorker
);

workerRouter.get("/", getWorkers);

workerRouter.get("/all/:fullname", getWorkerByName);

workerRouter.get("/:id", param("id").isMongoId(), getWorkerById);

workerRouter.put("/update/:id", () => {
  param("id").isMongoId(),
  updateWorker
});


module.exports = workerRouter;
