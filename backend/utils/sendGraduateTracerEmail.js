import { fileURLToPath } from "url";
import path from "path";
import hbs from "nodemailer-express-handlebars";
const nodemailer = (await import("nodemailer")).default;

// Fix __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create transporter
const transporter = nodemailer.createTransport({
  port: 465,
  secure: true,
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS,
  },
});

// Handlebars setup
const handlebarOptions = {
  viewEngine: {
    extname: ".hbs",
    layoutsDir: path.resolve("utils/templates/layouts"),
    defaultLayout: "main",
    partialsDir: path.resolve("utils/templates/partials"),
  },
  viewPath: path.resolve("utils/templates/emails"),
  extName: ".hbs",
};

transporter.use("compile", hbs(handlebarOptions));

// Reusable Email Sender
export const sendGraduateTracerEmail = async (
  recipientEmail,
  context,
  subject,
  template
) => {
  const mailOptions = {
    from: `ISPSC no reply ` + process.env.EMAIL_FROM,
    to: recipientEmail,
    subject: subject,
    attachments: [
      {
        filename: "ispsc.png",
        path: path.join(__dirname, "../assets/ispsc.png"),
        cid: "ispscLogo@ispscTracer.ee",
      },
    ],
    template: template,
    context: context,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully: " + info.response);
    return { success: true, message: "Email sent successfully!" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send email." };
  }
};
