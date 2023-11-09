import nodemailer from "nodemailer";

function mailTransporter() {
  const transporter = nodemailer.createTransport({
    service: "gmail", // e.g., Gmail, Outlook
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASSWORD,
    },
  });
  return transporter;
}
// const transporter = nodemailer.createTransport({
//   service: process.env.SERVICE, // e.g., 'Gmail'
//   auth: {
//     user: process.env.MAIL,
//     pass: process.env.PASSWORD,
//   },
// });

export const sendVerificationEmail = (to: string, OTP: string): void => {
  const transporter = mailTransporter();
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

export const salesTeamMail = (to: string, email: string): void => {
  const transporter = mailTransporter();
  const mailOptions: nodemailer.SendMailOptions = {
    from: process.env.MAIL,
    to,
    subject: "New User!",
    text: `New User whose email is ${email} tried to connect you.`,
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
}

// export default sendVerificationEmail;
// module.exports = { sendVerificationEmail, salesTeamMail };

