import express from "express";
import programController from "../controllers/programController.js";

const programRouter = express.Router();

//add program
programRouter.post("/add/:departmentId", programController.addProgram);

//edit program
programRouter.post("/edit/:programId", programController.editProgram);

//remove program
programRouter.post("/remove/:programId", programController.removeProgram);

//list of programs
programRouter.get("/list", programController.listProgram);

export default programRouter;
