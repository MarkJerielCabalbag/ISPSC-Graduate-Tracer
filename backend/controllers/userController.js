import asyncHandler from "express-async-handler";
import { PrismaClient } from "@prisma/client";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const nodemailer = require("nodemailer");
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
    departmentId,
    programId,
    majorId,
    isJobAligned,
    isSelfEmployed,
    isFurtherStudies,
    typeOfOrganization,
    currentJobLocated,
  } = req.body;

  // if (
  //   !yearOfSurvey ||
  //   !email ||
  //   !fullName ||
  //   !yearOfGraduation ||
  //   !departmentId ||
  //   !program ||
  //   !currentlyEmployed ||
  //   !isJobAligned ||
  //   !isSelfEmployed ||
  //   !isFurtherStudies ||
  //   !typeOfOrganization ||
  //   !currentJobLocated
  // ) {
  //   return res.status(400).json({ message: "Please fill all fields" });
  // }

  const listOfUser = await prisma.responses.findMany();

  const department = await prisma.department.findUnique({
    where: {
      id: departmentId,
    },
  });

  const program = await prisma.program.findUnique({
    where: {
      id: programId,
    },
  });

  const major = await prisma.major.findUnique({
    where: {
      id: majorId,
    },
  });

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

        isJobAligned: isJobAligned,
        isSelfEmployed: isSelfEmployed,
        isFurtherStudies: isFurtherStudies,
        typeOfOrganization: typeOfOrganization,
        currentJobLocated: currentJobLocated,
        email: email,
        department: department.department,
        program: program.program,
        major: major.major,
      },
    });
    const nodemailer = (await import("nodemailer")).default;
    const transporter = nodemailer.createTransport({
      host: "live.smtp.mailtrap.io",
      port: 587,
      secure: false, // use SSL
      auth: {
        user: "1a2b3c4d5e6f7g",
        pass: "1a2b3c4d5e6f7g",
      },
    });

    const mailOptions = {
      from: "cabalbagmarkg@gmail.com",
      to: "silverignite23@gmail.com",
      subject: "Sending Email using Node.js",
      text: "That was easy!",
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
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
