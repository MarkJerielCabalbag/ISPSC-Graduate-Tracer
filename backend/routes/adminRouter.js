import express from "express";
import adminController from "../controllers/adminController.js";
const adminRouter = express.Router();

adminRouter.get("/getAllData", adminController.getSummaryData);

adminRouter.get(
  "/overviewTracedGraduates",
  adminController.overviewTracedStudents
);

export default adminRouter;
