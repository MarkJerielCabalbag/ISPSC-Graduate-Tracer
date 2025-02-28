import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//@DESC     add program related to department
//@ROUTE    /api/graduateTracer/program/add/:departmentId
//@ACCESS   public
const addProgram = asyncHandler(async (req, res, next) => {
  const { departmentId } = req.params;
  const { program } = req.body;

  if (!program) {
    return res.status(200).json({ message: "Please fill all fields" });
  }

  const isDepartmentExist = await prisma.department.findUnique({
    where: {
      id: parseInt(departmentId),
    },
  });

  if (!isDepartmentExist) {
    return res
      .status(400)
      .json({ message: "The Department ID does not exist" });
  }

  const programExist = await prisma.program.findMany();

  for (let existProgram of programExist) {
    if (existProgram.program === program) {
      return res.status(400).json({
        message: `The program ${existProgram.program} is already exist`,
      });
    }
  }

  try {
    const newProgram = await prisma.program.create({
      data: {
        program: program,
        relatedToDepartment: {
          connect: {
            id: parseInt(departmentId),
          },
        },
      },
    });

    return res
      .status(200)
      .json({ message: `${newProgram.program} is successfully created` });
  } catch (error) {
    return res.status(400).json({ message: `An error occured: ${error}` });
  }
});

//@DESC     edit program
//@ROUTE
//@ACCESS
const editProgram = asyncHandler(async (req, res, next) => {
  const { departmentId } = req.params;
  const { program } = req.body;

  if (!program) {
    return res.status(200).json({ message: "Please fill all fields" });
  }

  const isDepartmentExist = await prisma.department.findUnique({
    where: {
      id: parseInt(departmentId),
    },
  });

  if (!isDepartmentExist) {
    return res
      .status(400)
      .json({ message: "The Department ID does not exist" });
  }

  const programExist = await prisma.program.findMany();

  for (let existProgram of programExist) {
    if (existProgram.program === program) {
      return res.status(400).json({
        message: `The program ${existProgram.program} is already exist`,
      });
    }
  }

  try {
    const newProgram = await prisma.program.create({
      data: {
        program: program,
        relatedToDepartment: {
          connect: {
            id: parseInt(departmentId),
          },
        },
      },
    });

    return res
      .status(200)
      .json({ message: `${newProgram.program} is successfully created` });
  } catch (error) {
    return res.status(400).json({ message: `An error occured: ${error}` });
  }
});

//@DESC     remove program
//@ROUTE
//@ACCESS
const removeProgram = asyncHandler(async (req, res, next) => {
  console.log("remove department");
});

export default {
  addProgram,
  editProgram,
  removeProgram,
};
