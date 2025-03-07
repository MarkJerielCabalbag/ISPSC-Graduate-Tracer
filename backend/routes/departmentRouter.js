import express from "express";
import departmentController from "../controllers/departmentController.js";

const departmentRouter = express.Router();

//add department
departmentRouter.post("/add", departmentController.addDepartment);

//edit department
departmentRouter.post("/edit/:id", departmentController.editDepartment);

//remove department
departmentRouter.post("/remove/:id", departmentController.removeDepartment);

//list department
departmentRouter.get("/list", departmentController.departmentList);

//get related program from department
departmentRouter.post(
  "/program/:departmentId",
  departmentController.getRelatedProgram
);

export default departmentRouter;
