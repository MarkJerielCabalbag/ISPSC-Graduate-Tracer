import express from "express";
import userController from "../controllers/userController.js";

const userRouter = express.Router();

//add response
userRouter.post("/add/response", userController.addResponse);
export default userRouter;
