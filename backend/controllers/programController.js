import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
const prisma = new PrismaClient().$extends(withAccelerate());

//@DESC     add program related to department
//@ROUTE    /api/graduateTracer/program/add/:departmentId
//@ACCESS   public
const addProgram = asyncHandler(async (req, res, next) => {
  const { departmentId } = req.params;
  const { program } = req.body;

  if (!program) {
    return res.status(400).json({ message: "Please fill all fields" });
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
//@ROUTE    /api/graduateTracer/program/edit/:programId
//@ACCESS
const editProgram = asyncHandler(async (req, res, next) => {
  const { programId } = req.params;
  const { program } = req.body;

  if (!program) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  const isDepartmentExist = await prisma.program.findUnique({
    where: {
      id: parseInt(programId),
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
    const newProgram = await prisma.program.update({
      where: {
        id: parseInt(programId),
      },
      data: {
        program: req.body.program.toUpperCase() || undefined,
      },
    });

    return res
      .status(200)
      .json({ message: `${newProgram.program} is successfully updated` });
  } catch (error) {
    return res.status(400).json({ message: `An error occured: ${error}` });
  }
});

//@DESC     remove program
//@ROUTE    /api/graduateTracer/program/add/:departmentId
//@ACCESS   public
const removeProgram = asyncHandler(async (req, res, next) => {
  const { programId } = req.params;

  const isProgramExist = await prisma.program.findUnique({
    where: {
      id: parseInt(programId),
    },
  });

  if (!isProgramExist) {
    return res
      .status(400)
      .json({ message: "The Department ID does not exist" });
  }

  try {
    const deleteProgram = await prisma.program.delete({
      where: {
        id: parseInt(programId),
      },
    });

    return res
      .status(200)
      .json({ message: `${deleteProgram.program} is successfully deleted` });
  } catch (error) {
    return res.status(400).json({ message: `An error occured: ${error}` });
  }
});

//@DESC     list of programs
//@ROUTE    /api/graduateTracer/program/list
//@ACCESS   public
const listProgram = asyncHandler(async (req, res, next) => {
  const programs = await prisma.program.findMany();

  return res
    .status(200)
    .send(
      programs.length !== 0 ? programs : "There are no programs created yet"
    );
});

export default {
  addProgram,
  editProgram,
  removeProgram,
  listProgram,
};
