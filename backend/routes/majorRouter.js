import express from "express";
import majorController from "../controllers/majorController.js";

const majorRouter = express.Router();

//add major
majorRouter.post("/add/:programId", majorController.addMajor);

//remove major
majorRouter.post("/remove/:majorId", majorController.removeMajor);

//edit major
majorRouter.post("/edit/:majorId", majorController.editMajor);

//list major
majorRouter.get("/list", majorController.listMajor);

//get related major from program
majorRouter.post("/:programId", majorController.getRelatedMajor);

export default majorRouter;
