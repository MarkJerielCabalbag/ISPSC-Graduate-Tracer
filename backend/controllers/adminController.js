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

  // Get the totals for each year and program
  const summary = await Promise.all(
    years.map(async (graduate) => {
      const programs = await prisma.responses.findMany({
        where: {
          yearOfGraduation: graduate.yearOfGraduation,
        },
        select: {
          program: true,
        },
        distinct: ["program"],
      });

      const programData = await Promise.all(
        programs.map(async (program) => {
          const totalGraduates = await prisma.responses.count({
            where: {
              yearOfGraduation: graduate.yearOfGraduation,
              program: program.program,
            },
          });

          const totalEmployedStudents = await prisma.responses.count({
            where: {
              yearOfGraduation: graduate.yearOfGraduation,
              program: program.program,
              isEmployed: "yes",
            },
          });

          const totalEmployedGraduatesAlignedToTheirProgram =
            await prisma.responses.count({
              where: {
                yearOfGraduation: graduate.yearOfGraduation,
                program: program.program,
                isJobAligned: "yes",
              },
            });

          const totalEmployedGraduatesNotAlignedToTheirProgram =
            await prisma.responses.count({
              where: {
                yearOfGraduation: graduate.yearOfGraduation,
                program: program.program,
                isJobAligned: "no",
              },
            });

          const totalOfSelfEmployed = await prisma.responses.count({
            where: {
              yearOfGraduation: graduate.yearOfGraduation,
              program: program.program,
              isSelfEmployed: "yes",
            },
          });

          const totalOfGraduatesEnrolledInFurtherStudies =
            await prisma.responses.count({
              where: {
                yearOfGraduation: graduate.yearOfGraduation,
                program: program.program,
                isFurtherStudies: "yes",
              },
            });

          const totalOfGraduatesEmployedInGovernment =
            await prisma.responses.count({
              where: {
                yearOfGraduation: graduate.yearOfGraduation,
                program: program.program,
                typeOfOrganization: "government",
              },
            });

          const totalOfGraduatesEmployedInPrivate =
            await prisma.responses.count({
              where: {
                yearOfGraduation: graduate.yearOfGraduation,
                program: program.program,
                typeOfOrganization: "private institution",
              },
            });

          const totalOfGraduatesFreelance = await prisma.responses.count({
            where: {
              yearOfGraduation: graduate.yearOfGraduation,
              program: program.program,
              typeOfOrganization: "entrepreneurial / freelance",
            },
          });

          const totalOfGraduatesEmployedLocally = await prisma.responses.count({
            where: {
              yearOfGraduation: graduate.yearOfGraduation,
              program: program.program,
              currentJobLocated: "locally",
            },
          });

          const totalOfGraduatesEmployedAbroad = await prisma.responses.count({
            where: {
              yearOfGraduation: graduate.yearOfGraduation,
              program: program.program,
              currentJobLocated: "abroad",
            },
          });

          return {
            program: program.program,
            totalGraduates,
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

      return {
        yearOfGraduation: graduate.yearOfGraduation,
        programData,
      };
    })
  );

  console.log(summary);
  return res.status(200).send(summary);
});

export default {
  getSummaryData,
};
