import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { uid } from "uid";
const prisma = new PrismaClient().$extends(withAccelerate());

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
          const totalTracedGraduates = await prisma.responses.count({
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
            totalTracedGraduates,
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
        yearOfGraduation: String(graduate.yearOfGraduation),
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

//@DESC     Overview of row graduates
//@ROUTE    /api/graduateTracer/admin/graduates/:yearOfGraduation/:program
//@ACCESS   POST
const OverviewRowGaduates = asyncHandler(async (req, res, next) => {
  const { yearOfGraduation, program } = req.params;

  if (!yearOfGraduation || !program) {
    return res.status(400).json({ message: "Please fill those fields" });
  }

  try {
    const findGraduates = await prisma.responses.findMany({
      where: {
        yearOfGraduation: parseInt(yearOfGraduation),
        program: program,
      },
    });

    return res.status(200).send(findGraduates);
  } catch (e) {
    return res.status(400).json({ message: `An error occured: ${e}` });
  }
});

//@DESC     get total graduates based on year of graduation and program
//@ROUTE    /api/graduateTracer/admin/graduates/total/:yearOfGraduation/:program
//@ACCESS   GET
const getTotalGraduates = asyncHandler(async (req, res, next) => {
  const { yearOfGraduation, program } = req.params;

  const findYearAndProgram = await prisma.total.findMany({
    where: {
      program: program,
      yearOfGraduation: parseInt(yearOfGraduation),
    },
  });

  return res.status(200).send(findYearAndProgram);
});

//@DESC     add total graduates based on year of graduation and program
//@ROUTE    /api/graduateTracer/admin/graduates/total/:yearOfGraduation/:program
//@ACCESS   POST
const editTotalGraduates = asyncHandler(async (req, res, next) => {
  const { id, totalGraduates } = req.body;

  if (!id || !totalGraduates) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  try {
    const findTotalGraduatesExist = await prisma.total.update({
      where: {
        id: parseInt(id),
      },
      data: {
        totalGraduates: parseInt(totalGraduates),
      },
    });

    return res.status(200).json({
      message: `Successfully added total graduates: ${findTotalGraduatesExist.totalGraduates}`,
    });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

//@DESC     get employment statistics
//@ROUTE    /api/graduateTracer/admin/employmentStatistics/:yearOfGraduation/:program
//@ACCESS   GET
const getEmploymentStatistics = asyncHandler(async (req, res, next) => {
  const { yearOfGraduation, program } = req.params;

  if (!yearOfGraduation || !program) {
    return res.status(400).json({ message: "Please fill those fields" });
  }

  try {
    const majors = await prisma.responses.findMany({
      where: {
        yearOfGraduation: parseInt(yearOfGraduation),
        program: program,
      },
      select: {
        major: true,
      },
      distinct: ["major"],
    });

    const majorStatistics = await Promise.all(
      majors.map(async (major) => {
        const totalCount = await prisma.responses.count({
          where: {
            yearOfGraduation: parseInt(yearOfGraduation),
            program: program,
            major: major.major,
          },
        });

        const totalEmployed = await prisma.responses.count({
          where: {
            yearOfGraduation: parseInt(yearOfGraduation),
            program: program,
            major: major.major,
            isEmployed: "yes",
          },
        });

        const totalNotEmployed = await prisma.responses.count({
          where: {
            yearOfGraduation: parseInt(yearOfGraduation),
            program: program,
            major: major.major,
            isEmployed: "no",
          },
        });

        return {
          major: major.major,
          totalCount,
          totalEmployed,
          totalNotEmployed,
        };
      })
    );

    return res.status(200).send(majorStatistics);
  } catch (error) {
    return res
      .status(400)
      .json({ message: `An error occurred: ${error.message}` });
  }
});

//@DESC     get questions
//@ROUTE    /api/graduateTracer/admin/questions/:yearOfGraduation/:program
//@ACCESS   GET
const getQuestions = asyncHandler(async (req, res, next) => {
  const { yearOfGraduation, program } = req.params;

  if (!yearOfGraduation || !program) {
    return res.status(400).json({ message: "Please fill those fields" });
  }

  try {
    const majors = await prisma.responses.findMany({
      where: {
        yearOfGraduation: parseInt(yearOfGraduation),
        program: program,
      },
      select: {
        major: true,
      },
    });

    const findQuestions = await Promise.all(
      majors.map(async (major) => {
        const totalCurrentEmployed = await prisma.responses.count({
          where: {
            yearOfGraduation: parseInt(yearOfGraduation),
            program: program,
            isEmployed: "yes",
          },
        });

        const totalCurrentNotEmployed = await prisma.responses.count({
          where: {
            yearOfGraduation: parseInt(yearOfGraduation),
            program: program,
            isEmployed: "no",
          },
        });

        const totalJobAligned = await prisma.responses.count({
          where: {
            yearOfGraduation: parseInt(yearOfGraduation),
            program: program,
            isJobAligned: "yes",
          },
        });

        const totalJobNotAligned = await prisma.responses.count({
          where: {
            yearOfGraduation: parseInt(yearOfGraduation),
            program: program,
            isJobAligned: "no",
          },
        });

        const totalSelfEmployed = await prisma.responses.count({
          where: {
            yearOfGraduation: parseInt(yearOfGraduation),
            program: program,
            isSelfEmployed: "yes",
          },
        });

        const totalNotSelfEmployed = await prisma.responses.count({
          where: {
            yearOfGraduation: parseInt(yearOfGraduation),
            program: program,
            isSelfEmployed: "no",
          },
        });

        const totalFurtherStudies = await prisma.responses.count({
          where: {
            yearOfGraduation: parseInt(yearOfGraduation),
            program: program,
            isFurtherStudies: "yes",
          },
        });

        const totalNotFurtherStudies = await prisma.responses.count({
          where: {
            yearOfGraduation: parseInt(yearOfGraduation),
            program: program,
            isFurtherStudies: "no",
          },
        });

        const totalEmployedGovernment = await prisma.responses.count({
          where: {
            yearOfGraduation: parseInt(yearOfGraduation),
            program: program,
            typeOfOrganization: "government",
          },
        });

        const totalEmployedFreelance = await prisma.responses.count({
          where: {
            yearOfGraduation: parseInt(yearOfGraduation),
            program: program,
            typeOfOrganization: "entrepreneural / freelance",
          },
        });

        const totalEmployedPrivate = await prisma.responses.count({
          where: {
            yearOfGraduation: parseInt(yearOfGraduation),
            program: program,
            typeOfOrganization: "private",
          },
        });

        const totalEmployedLocally = await prisma.responses.count({
          where: {
            yearOfGraduation: parseInt(yearOfGraduation),
            program: program,
            currentJobLocated: "locally",
          },
        });

        const totalEmployedAbroad = await prisma.responses.count({
          where: {
            yearOfGraduation: parseInt(yearOfGraduation),
            program: program,
            currentJobLocated: "abroad",
          },
        });

        const structureQuestions = [
          {
            question: "Are you currently employed?",
            yes: totalCurrentEmployed,
            no: totalCurrentNotEmployed,
          },
          {
            question: "Is your job aligned with your program?",
            yes: totalJobAligned,
            no: totalJobNotAligned,
          },
          {
            question: "Are you self-employed?",
            yes: totalSelfEmployed,
            no: totalNotSelfEmployed,
          },
          {
            question: "Are you currently enrolled in further studies?",
            yes: totalFurtherStudies,
            no: totalNotFurtherStudies,
          },
        ];

        return structureQuestions;
      })
    );

    return res.status(200).json(findQuestions.flatMap((data) => data));
  } catch (e) {
    return res.status(400).json({ message: `An error occured: ${e}` });
  }
});

//@DESC     get traced percentage
//@ROUTE    /api/graduateTracer/admin/percentage/:yearOfGraduation/:program
//@ACCESS   GET
const tracedPercentage = asyncHandler(async (req, res, next) => {
  const { yearOfGraduation, program } = req.params;

  if (!yearOfGraduation || !program) {
    return res.status(400).json({ message: "Please fill those fields" });
  }

  try {
    const majors = await prisma.responses.findMany({
      where: {
        yearOfGraduation: parseInt(yearOfGraduation),
        program: program,
      },
      select: {
        major: true,
      },
      distinct: ["major"],
    });

    const totalGraduate = await prisma.total.findMany({
      where: {
        yearOfGraduation: parseInt(yearOfGraduation),
        program: program,
      },
    });

    const majorStatistics = await Promise.all(
      majors.map(async (major) => {
        const totalCount = await prisma.responses.count({
          where: {
            yearOfGraduation: parseInt(yearOfGraduation),
            program: program,
          },
        });

        const flatenTotalGraduate = totalGraduate.map(
          (data) => data.totalGraduates
        );

        return {
          major: `PERCENTAGE TRACED IN MAJOR ${major.major}: `,
          tracedPercentage: (totalCount / flatenTotalGraduate) * 100,
          untTracedPercentage: 100 - (totalCount / flatenTotalGraduate) * 100,
        };
      })
    );

    return res.status(200).send(majorStatistics);
  } catch (error) {
    return res.status(400).json({ message: `An error occurred: ${error}` });
  }
});
export default {
  getSummaryData,
  overviewTracedStudents,
  listOfPrograms,
  getEmploymentStatistics,
  OverviewRowGaduates,
  getTotalGraduates,
  editTotalGraduates,
  getQuestions,
  tracedPercentage,
};
