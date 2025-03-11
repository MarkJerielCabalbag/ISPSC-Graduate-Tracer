import express from "express";
import cors from "cors";
import "dotenv/config";
import departmentRouter from "./routes/departmentRouter.js";
import programRouter from "./routes/programRouter.js";
import majorRouter from "./routes/majorRouter.js";
import userRouter from "./routes/userRouter.js";
import adminRouter from "./routes/adminRouter.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
const url = "/api/graduateTracer";
app.use(`${url}/department`, departmentRouter);
app.use(`${url}/program`, programRouter);
app.use(`${url}/major`, majorRouter);
app.use(`${url}/user`, userRouter);
app.use(`${url}/admin`, adminRouter);

app.listen(process.env.PORT || 7000, () => {
  console.log(`App is running on port: ${process.env.PORT}`);
});
