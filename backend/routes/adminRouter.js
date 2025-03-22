import express from "express";
import adminController from "../controllers/adminController.js";
const adminRouter = express.Router();

adminRouter.get("/getAllData", adminController.getSummaryData);

adminRouter.get(
  "/overviewTracedGraduates",
  adminController.overviewTracedStudents
);

adminRouter.get("/listOfPrograms", adminController.listOfPrograms);

adminRouter.get(
  "/graduates/:yearOfGraduation/:program",
  adminController.OverviewRowGaduates
);

adminRouter.get(
  "/graduates/total/:yearOfGraduation/:program",
  adminController.getTotalGraduates
);

adminRouter.post("/graduates/total", adminController.editTotalGraduates);

adminRouter.get(
  "/employmentStatistics/:yearOfGraduation/:program",
  adminController.getEmploymentStatistics
);

export default adminRouter;
