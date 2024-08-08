const express = require("express");
const { getWorkers } = require("../controllers/worker.controller");

const workerRouter = express.Router();

workerRouter.post("/create", () => {
  console.log("Create Worker");
});

workerRouter.get("/", 
  getWorkers,
);

workerRouter.get("/find-by-fullname/:fullname", () => {
  console.log("Find Worker By Fullname");
});

workerRouter.put("/update/:id", () => {
  console.log("Update Worker");
  /* se pueden actualizar varias cositas */
});

workerRouter.put("/red", () => {
  console.log("Add social media");
});

workerRouter.put("/hours", () => {
    console.log("Add hours");
});

workerRouter.put("/category", () => {
    console.log("Add category");
});

/* ¿ Añadimos lo de que tenga la fecha del calendario disponible ? */

module.exports = workerRouter