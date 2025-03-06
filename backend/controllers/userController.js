import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//@DESC     add response
//@ROUTE    /api/graduateTracer/user/add/response
//@ACCESS   public
const addResponse = asyncHandler(async (req, res, next) => {
  const {
    yearOfSurvey,
    email,
    fullName,
    yearOfGraduation,
    department,
    program,
    major,
    currentlyEmployed,
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
    !department ||
    !program ||
    !currentlyEmployed ||
    !isJobAligned ||
    !isSelfEmployed ||
    !isFurtherStudies ||
    !typeOfOrganization ||
    !currentJobLocated
  ) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  const listOfUser = await prisma.responses.findMany();

  for (let user of listOfUser) {
    if (user.email === email) {
      return res
        .status(400)
        .json({ message: `${user.fullName} is already traced! Thank you` });
    }
  }

  try {
    const newResponse = await prisma.responses.create({
      data: {
        fullName: fullName,
        yearOfGraduation: parseInt(yearOfGraduation),
        yearOfSurvey: parseInt(yearOfSurvey),
        currentlyEmployed: currentlyEmployed,
        isJobAligned: isJobAligned,
        isSelfEmployed: isSelfEmployed,
        isFurtherStudies: isFurtherStudies,
        typeOfOrganization: typeOfOrganization,
        currentJobLocated: currentJobLocated,
        email: email,
        department: department,
        program: program,
        major: major,
      },
    });

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
