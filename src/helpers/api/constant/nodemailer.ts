import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
  service: process.env.SERVICE, // e.g., 'Gmail'
  auth: {
    user: process.env.MAIL,
    pass: process.env.PASSWORD,
  },
});

const sendVerificationEmail = (to: string, OTP: string): void => {
  const mailOptions: nodemailer.SendMailOptions = {
    from: process.env.MAIL,
    to,
    subject: "Email Verification",
    text: `YOUR ONE TIME PASSWORD IS : ${OTP}`,
  };

  transporter.sendMail(
    mailOptions,
    (error: Error | null, info: nodemailer.SentMessageInfo) => {
      if (error) {
        console.log("Error sending email: " + error);
      } else {
        console.log("Email sent: " + info.response);
      }
    }
  );
};

export default sendVerificationEmail;
