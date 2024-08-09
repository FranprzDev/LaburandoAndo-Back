const express = require("express");
const { param } = require("express-validator");
const { updateImg, getUsers, updatePassword } = require("../controllers/user.controllers");
const { idParamValidations } = require("../common/expressValidations");

const userRouter = express.Router();

userRouter.get("/", 
    getUsers
);

userRouter.patch("/updateImg/:id", 
    idParamValidations,
    updateImg
)

userRouter.patch("/updatePassword/:id", 
    [idParamValidations],
    updatePassword
)

userRouter.post("/create", () => {
    console.log("Create User");
})




userRouter.put("/update/:id", () => {
    console.log("Update User");
});

/* Corresponden a comments y stars respectivamente */

userRouter.put("/comment", () => {
    console.log("Add comment");
});


module.exports = userRouter;