const express = require("express");
const {
  getWorkers,
  createWorker,
  getWorkerById,
  getWorkerByName,
  updateWorker,
  deleteWorker,
} = require("../controllers/worker.controller");
const { expressValidations } = require("../middlewares/common.validations");
const { idParamValidations } = require("../common/expressValidations");
const { createWorkerValidations } = require("../common/expressValidations");

const workerRouter = express.Router();

workerRouter.post("/create", createWorkerValidations, expressValidations, createWorker);
workerRouter.get("/", getWorkers);
workerRouter.get("/:id", idParamValidations, getWorkerById);
workerRouter.get("/name/:fullname", getWorkerByName);
workerRouter.put("/update/:id", idParamValidations, updateWorker);
workerRouter.delete("/delete/:id", idParamValidations, deleteWorker);



module.exports = workerRouter;
