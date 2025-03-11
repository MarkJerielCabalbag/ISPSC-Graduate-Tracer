import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//@DESC     add department
//@ROUTE    /api/graduateTracer/admin/getAllData
//@ACCESS   Get
const getSummaryData = asyncHandler(async (req, res, next) => {
  const years = await prisma.responses.findMany({
    select: {
      yearOfGraduation: true,
    },
    distinct: ["yearOfGraduation"],
  });

  // Get the totals for each year
  const summary = await Promise.all(
    years.map(async (graduate) => {
      const totalGraduates = await prisma.responses.count({
        where: {
          yearOfGraduation: graduate.yearOfGraduation,
        },
      });

      // const totalTracedStudents = await prisma.responses.count({
      //   where: {
      //     yearOfGraduation: graduate.yearOfGraduation,
      //     traced: true,
      //   },
      // });

      const totalEmployedStudents = await prisma.responses.count({
        where: {
          yearOfGraduation: graduate.yearOfGraduation,
          isEmployed: true,
        },
      });

      const totalEmployedGraduatesAlignedToTheirProgram =
        await prisma.responses.count({
          where: {
            yearOfGraduation: graduate.yearOfGraduation,
            isJobAligned: true,
          },
        });

      const totalEmployedGraduatesNotAlignedToTheirProgram =
        await prisma.responses.count({
          where: {
            yearOfGraduation: graduate.yearOfGraduation,
            isJobAligned: "no",
          },
        });

      const totalOfSelfEmployed = await prisma.responses.count({
        where: {
          yearOfGraduation: graduate.yearOfGraduation,
          isSelfEmployed: true,
        },
      });

      const totalOfGraduatesEnrolledInFurtherStudies =
        await prisma.responses.count({
          where: {
            yearOfGraduation: graduate.yearOfGraduation,
            isFurtherStudies: true,
          },
        });

      const totalOfGraduatesEmployedInGovernment = await prisma.responses.count(
        {
          where: {
            yearOfGraduation: graduate.yearOfGraduation,
            typeOforganization: "government",
          },
        }
      );

      const totalOfGraduatesEmployedInPrivate = await prisma.responses.count({
        where: {
          yearOfGraduation: graduate.yearOfGraduation,
          typeOfOrganization: "private institution",
        },
      });

      const totalOfGraduatesFreelance = await prisma.responses.count({
        where: {
          yearOfGraduation: graduate.yearOfGraduation,
          typeOforganization: "entreprenueral / freelance",
        },
      });

      const totalOfGraduatesEmployedLocally = await prisma.responses.count({
        where: {
          yearOfGraduation: graduate.yearOfGraduation,
          currentJobLocated: "locally",
        },
      });

      const totalOfGraduatesEmployedAbroad = await prisma.responses.count({
        where: {
          yearOfGraduation: graduate.yearOfGraduation,
          currentJobLocated: "abroad",
        },
      });

      return {
        yearOfGraduation: graduate.yearOfGraduation,
        totalGraduates,
        totalTracedStudents,
        totalEmployedStudents,
        totalEmployedGraduatesAlignedToTheirProgram,
        totalEmployedGraduatesNotAlignedToTheirProgram,
        totalOfSelfEmployed,
        totalOfGraduatesEnrolledInFurtherStudies,
        totalOfGraduatesEmployedInGovernment,
        totalOfGraduatesEmployedInPrivate,
        totalOfGraduatesFreelance,
        totalOfGraduatesEmployedLocally,
        totalOfGraduatesEmployedAbroad,
      };
    })
  );

  console.log(summary);
  return res.status(200).json(summary);
});

export default {
  getSummaryData,
};
