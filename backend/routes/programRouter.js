import express from "express";
import programController from "../controllers/programController.js";

const programRouter = express.Router();

//add program
programRouter.post("/add/:departmentId", programController.addProgram);

export default programRouter;
