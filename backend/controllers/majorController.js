import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

const prisma = new PrismaClient().$extends(withAccelerate());

//@DESC     add major related to the program
//@ROUTE    /api/graduateTracer/major/add/:programId
//@ACCESS   POST public
const addMajor = asyncHandler(async (req, res, next) => {
  const { major } = req.body;

  const { programId } = req.params;

  if (!major) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  const findProgram = await prisma.program.findUnique({
    where: {
      id: parseInt(programId),
    },
  });

  const majorList = await prisma.major.findMany();

  for (let majorExist of majorList) {
    if (majorExist.major === major) {
      return res
        .status(400)
        .json({ message: `${majorExist.major} is already exist` });
    }
  }

  if (!findProgram) {
    return res
      .status(400)
      .json({ message: `The ID: ${programId} does not exist` });
  }

  try {
    const newMajor = await prisma.major.create({
      data: {
        major: major.toUpperCase(),
        relatedToProgram: {
          connect: {
            id: parseInt(programId),
          },
        },
      },
    });

    return res
      .status(200)
      .json({ message: `The ${newMajor.major} is successfully added` });
  } catch (error) {
    return res.status(400).json({ message: `An error occured: ${error}` });
  }
});

//@DESC     edit major related to the program
//@ROUTE    /api/graduateTracer/major/edit/:majorId
//@ACCESS   POST public
const editMajor = asyncHandler(async (req, res, next) => {
  const { major } = req.body;

  const { majorId } = req.params;

  const majorList = await prisma.major.findMany();

  const majorExist = await prisma.major.findUnique({
    where: {
      id: parseInt(majorId),
    },
  });

  if (!majorExist) {
    return res
      .status(400)
      .json({ message: `The ID: ${majorId} does not exist` });
  }

  if (!major) {
    return res.status(400).json({ message: `Please fill all fields` });
  }

  for (let isMajorExist of majorList) {
    if (isMajorExist.major === major) {
      return res
        .status(400)
        .json({ message: `The ${isMajorExist.major} is already exist` });
    }
  }

  try {
    const updateMajor = await prisma.major.update({
      where: {
        id: parseInt(majorId),
      },
      data: {
        major: major,
      },
    });

    return res
      .status(200)
      .json({ message: `The ${updateMajor.major} is successfully updated` });
  } catch (error) {
    return res.status(400).json({ message: `An error occured: ${error}` });
  }
});

//@DESC     remove major related to the program
//@ROUTE    /api/graduateTracer/major/remove/:majorId
//@ACCESS   POST public
const removeMajor = asyncHandler(async (req, res, next) => {
  const { majorId } = req.params;

  if (!majorId) {
    return res
      .status(400)
      .json({ message: `The ID: ${majorId} does not exist` });
  }

  const majorExist = await prisma.major.findUnique({
    where: {
      id: parseInt(majorId),
    },
  });

  if (!majorExist) {
    return res.status(400).json({ message: "The major does not exist" });
  }

  try {
    const removeMajor = await prisma.major.delete({
      where: {
        id: parseInt(majorId),
      },
    });

    return res
      .status(200)
      .json({ message: `The ${removeMajor.major} is successfully removed` });
  } catch (error) {
    return res.status(400).json({ message: `An error occured: ${error}` });
  }
});

//@DESC     list of major related to the program
//@ROUTE    /api/graduateTracer/major/list
//@ACCESS   GET public
const listMajor = asyncHandler(async (req, res, next) => {
  const majorList = await prisma.major.findMany();

  return res.status(200).send(majorList.reverse());
});

//@DESC     get related major related to program
//@ROUTE    /api/graduateTracer/major/:programId
//@ACCESS   POST public
const getRelatedMajor = asyncHandler(async (req, res, next) => {
  const { programId } = req.params;

  const isProgramExist = await prisma.program.findMany();

  for (let program of isProgramExist) {
    if (!program.id) {
      return res
        .status(400)
        .json({ message: `The ID ${programId} does not exist` });
    }
  }

  try {
    const isMajorRelated = await prisma.major.findMany({
      where: {
        programId: parseInt(programId),
      },
    });

    console.log(isMajorRelated);

    return res.status(200).send(isMajorRelated);
  } catch (error) {
    return res.status(400).json({ message: `An error occured: ${error}` });
  }
});
export default {
  addMajor,
  editMajor,
  removeMajor,
  listMajor,
  getRelatedMajor,
};
