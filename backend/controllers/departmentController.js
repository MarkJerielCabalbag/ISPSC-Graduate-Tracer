import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

//@DESC     add department
//@ROUTE    /api/graduateTracer/department/add
//@ACCESS   POST public
const addDepartment = asyncHandler(async (req, res, next) => {
  const { department } = req.body;

  if (!department) {
    return res.status(400).json({ message: "Please fill the field" });
  }

  const duplicateDepartment = await prisma.department.findMany();

  for (let existDepartment of duplicateDepartment) {
    if (existDepartment.department === department) {
      return res.status(400).json({
        message: `The ${existDepartment.department} is already exist`,
      });
    }
  }

  try {
    const newDepartment = await prisma.department.create({
      data: {
        department: department.toUpperCase(),
      },
    });

    return res.status(200).json({
      message: `Department ${newDepartment.department} has been added`,
    });
  } catch (error) {
    return res.status(400).json({ message: `An error occured ${error}` });
  }
});

//@DESC     edit department
//@ROUTE    /api/graduateTracer/department/edit/:id
//@ACCESS   POST public
const editDepartment = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const checkDepartmentExist = await prisma.department.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!checkDepartmentExist) {
    return res.status(400).json({ message: `The ID:${id} does not exist` });
  }

  try {
    const updateDepartment = await prisma.department.update({
      where: {
        id: parseInt(id),
      },
      data: {
        department: req.body.department || undefined,
      },
    });

    return res.status(400).json({
      message: `The ${updateDepartment.department} is successfully updated!`,
    });
  } catch (error) {
    return res.status(400).json({ message: `An error occured:${error}` });
  }
});

//@DESC     remove department
//@ROUTE    /api/graduateTracer/department/remove/:id
//@ACCESS   POST public
const removeDepartment = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const checkDepartmentExist = await prisma.department.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!checkDepartmentExist) {
    return res.status(400).json({ message: `The ID:${id} does not exist` });
  }

  try {
    const removeDepartment = await prisma.department.delete({
      where: {
        id: parseInt(id),
      },
    });

    return res.status(200).json({
      message: `The ${removeDepartment.department} is successfully deleted!`,
    });
  } catch (error) {
    return res.status(400).json({ message: `An error occured: ${error}` });
  }
});

//@DESC     list all department
//@ROUTE    /api/graduateTracer/department/
//@ACCESS   GET public
const departmentList = asyncHandler(async (req, res, next) => {
  const departments = await prisma.department.findMany();

  return res
    .status(200)
    .send(
      departments.length !== 0
        ? departments
        : "There are no Departments exist yet"
    );
});

//@DESC     view programs related to department / college
//@ROUTE    /api/graduateTracer/department/program/:departmentId
//@ACCESS   POST public
const getRelatedProgram = asyncHandler(async (req, res, next) => {
  const { departmentId } = req.params;

  const isDepartmentExist = await prisma.department.findMany();

  for (let department of isDepartmentExist) {
    if (!department.id) {
      return res
        .status(400)
        .json({ message: `The ID ${departmentId} does not exist` });
    }
  }

  try {
    const isProgramRelated = await prisma.program.findMany({
      where: {
        departmentId: parseInt(departmentId),
      },
    });

    console.log(isProgramRelated);

    return res.status(200).send(isProgramRelated);
  } catch (error) {
    return res.status(400).json({ message: `An error occured: ${error}` });
  }
});
export default {
  addDepartment,
  editDepartment,
  removeDepartment,
  departmentList,
  getRelatedProgram,
};
