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

adminRouter.get(
  "/questions/:yearOfGraduation/:program",
  adminController.getQuestions
);

adminRouter.get(
  "/percentage/:yearOfGraduation/:program",
  adminController.tracedPercentage
);

adminRouter.get(
  "/organization/:yearOfGraduation/:program",
  adminController.getTypeOfOrganisation
);

adminRouter.get(
  "/jobLocation/:yearOfGraduation/:program",
  adminController.getCurrentJobLocation
);
adminRouter.get(
  "/department/:departmentId",
  adminController.getDepartmentDetails
);
export default adminRouter;
