const express = require("express");
const { updateImg, getUsers, updatePassword, addComment, deleteUser } = require("../controllers/user.controllers");
const { idParamValidations, commentsValidations } = require("../common/expressValidations");

const userRouter = express.Router();

userRouter.get("/", 
    getUsers
);

userRouter.patch("/updateImg/:id", 
    idParamValidations,
    updateImg
)

userRouter.patch("/updatePassword/:id", 
    idParamValidations,
    updatePassword
)

userRouter.delete(
    "/delete/:id",
    idParamValidations,
    deleteUser
  );

module.exports = userRouter;