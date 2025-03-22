import asyncHandler from "express-async-handler";
import { sendGraduateTracerEmail } from "../utils/sendGraduateTracerEmail.js";

import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

//@DESC     add response
//@ROUTE    /api/graduateTracer/user/add/response
//@ACCESS   public
const addResponse = asyncHandler(async (req, res, next) => {
  const {
    yearOfSurvey,
    email,
    fullName,
    yearOfGraduation,
    departmentId,
    programId,
    majorId,
    isEmployed,
    isJobAligned,
    isSelfEmployed,
    isFurtherStudies,
    typeOfOrganization,
    currentJobLocated,
  } = req.body;

  if (
    !yearOfSurvey ||
    !email ||
    !fullName ||
    !yearOfGraduation ||
    !departmentId ||
    !programId ||
    !majorId ||
    !isEmployed ||
    !isJobAligned ||
    !isSelfEmployed ||
    !isFurtherStudies ||
    !typeOfOrganization ||
    !currentJobLocated
  ) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  const listOfUser = await prisma.responses.findMany();

  const department = await prisma.department.findUnique({
    where: {
      id: departmentId,
    },
  });

  const program = await prisma.program.findUnique({
    where: {
      id: programId,
    },
  });

  const major = await prisma.major.findUnique({
    where: {
      id: majorId,
    },
  });

  for (let user of listOfUser) {
    if (user.email === email) {
      return res
        .status(400)
        .json({ message: `${user.fullName} is already traced! Thank you` });
    }
  }

  try {
    const [newResponse, emailResult] = await Promise.all([
      prisma.responses.create({
        data: {
          fullName,
          yearOfGraduation: parseInt(yearOfGraduation),
          yearOfSurvey: parseInt(yearOfSurvey),
          isEmployed,
          isJobAligned,
          isSelfEmployed,
          isFurtherStudies,
          typeOfOrganization,
          currentJobLocated,
          email,
          department: department?.department,
          program: program?.program,
          major: major?.major,
        },
      }),
      sendGraduateTracerEmail(email, fullName),
    ]);

    const yearAndProgramExist = await prisma.total.findMany({
      where: {
        yearOfGraduation: parseInt(yearOfGraduation),
        program: program.program,
      },
    });

    if (yearAndProgramExist.length === 0) {
      await prisma.total.create({
        data: {
          yearOfGraduation: parseInt(yearOfGraduation),
          program: program.program,
          department: department.department,
        },
      });
    }

    console.log("Email sent: ", emailResult.response);

    return res.status(200).json({
      message: `Thank you ${newResponse.fullName} for being part of this tracing!`,
    });
  } catch (error) {
    return res.status(400).json({ message: `An error occured: ${error}` });
  }
});

export default {
  addResponse,
};
