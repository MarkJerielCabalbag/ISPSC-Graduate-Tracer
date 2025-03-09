const nodemailer = (await import("nodemailer")).default;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendGraduateTracerEmail = async (recipientEmail, fullName) => {
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: recipientEmail,
    subject: "Thank You for Completing the Graduate Tracer Form!",
    attachments: [
      {
        filename: "ispsc.png",
        path: "./assets/ispsc.png",
        cid: "ispscLogo@ispscTracer.ee",
      },
    ],
    html: `
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            color: #333;
            text-align: center;
            padding: 20px;
          }
          .container {
            background: white;
            max-width: 600px;
            margin: auto;
            border-radius: 10px;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .header {
            background: #800000;
            color: white;
            padding: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .header img {
            width: 60px;
            height: 60px;
            margin-right: 15px;
          }
          .header h1 {
            font-size: 20px;
            margin: 0;
          }
          .body {
            padding: 50px 20px;
            line-height: 2rem;
          }
          .body p {
            font-size: 16px;
            line-height: 1.5;
          }
          .footer {
            background: #1C1C1C;
            color: gold;
            padding: 10px;
            font-size: 14px;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- HEADER -->
          <div class="header">
            <img src="cid:ispscLogo@ispscTracer.ee" alt="ISPSC Logo" />
            <div>
              <h1>Ilocos Sur Polytechnic State College</h1>
              <p>Sta. Maria Campus</p>
            </div>
          </div>

          <!-- BODY -->
          <div class="body">
            <h2>Dear ${fullName},</h2>
            <p>We sincerely appreciate your time and effort in completing the Graduate Tracer Form.</p>
            <p>Your response is invaluable in helping us improve our academic programs and ensure that ISPSC continues to provide quality education.</p>
            <p>Thank you for being an essential part of our ISPSC community. We wish you success in your future endeavors!</p>
          </div>

          <!-- FOOTER -->
          <div class="footer">
            <p>&copy; ${new Date().getFullYear()} Ilocos Sur Polytechnic State College</p>
            <p>Sta. Maria Campus, Ilocos Sur, Philippines</p>
          </div>
        </div>
      </body>
    </html>
    `,
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
