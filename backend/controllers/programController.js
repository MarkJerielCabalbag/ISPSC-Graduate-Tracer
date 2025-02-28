import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//@DESC     add program
//@ROUTE
//@ACCESS
const addProgram = asyncHandler(async (req, res, next) => {
  console.log("add department");
});

//@DESC     edit program
//@ROUTE
//@ACCESS
const editProgram = asyncHandler(async (req, res, next) => {
  console.log("edit department");
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
