import express from "express";
import cors from "cors";
import "dotenv/config";
import departmentRouter from "./routes/departmentRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api/graduateTracer/department", departmentRouter);

app.listen(process.env.PORT || 7000, () => {
  console.log(`App is running on port: ${process.env.PORT}`);
});
