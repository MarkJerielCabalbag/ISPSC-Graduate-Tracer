import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
import { uid } from "uid";
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

  const formattedData = summary.flatMap((yearData) =>
    yearData.programData.map((programData) => ({
      yearOfGraduation: yearData.yearOfGraduation,
      ...programData,
    }))
  );
  return res.status(200).send(formattedData);
});

//@DESC     overview traced students
//@ROUTE    /api/graduateTracer/admin/overviewStudents
//@ACCESS   Get
const overviewTracedStudents = asyncHandler(async (req, res, next) => {
  const departments = await prisma.department.findMany({
    select: {
      department: true,
    },
    distinct: ["department"],
  });

  const overviewTraced = await Promise.all(
    departments.map(async (department) => {
      const countTracedStudents = await prisma.responses.count({
        where: {
          department: department.department,
        },
      });

      return {
        id: uid(),
        department: department.department,
        totalTracedGraduates: countTracedStudents,
      };
    })
  );

  console.log(overviewTraced);

  return res.status(200).send(overviewTraced);
});

//@DESC     list of programs
//@ROUTE    /api/graduateTracer/admin/listOfPrograms
//@ACCESS   Get
const listOfPrograms = asyncHandler(async (req, res, next) => {
  const programs = await prisma.program.findMany({
    omit: {
      departmentId: true,
    },
  });

  return res.status(200).send(programs);
});

export default {
  getSummaryData,
  overviewTracedStudents,
  listOfPrograms,
};
