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
    text: `New User whose email is ${email} tried to contact you.`,
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

export const enterpriseUserMail = (to: string): void => {
  const transporter = mailTransporter();
  const mailOptions: nodemailer.SendMailOptions = {
    from: process.env.MAIL,
    to,
    subject: "New User!",
    text: `Heyy, Enterprise User is successfully created with mail ${to}.`,
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

export const inviteEnterpriseUserMail = (to: string): void => {
  const transporter = mailTransporter();
  const mailOptions: nodemailer.SendMailOptions = {
    from: process.env.MAIL,
    to,
    subject: "Invitation to join Enterprise!",
    text: `Heyy, you are invited to join the Enterprise`,
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

export const enterpriseAdminMail = (to: string, userMail: string): void => {
  const transporter = mailTransporter();
  const mailOptions: nodemailer.SendMailOptions = {
    from: process.env.MAIL,
    to,
    subject: "Attention!",
    text: `The enterprise user with mail (${userMail}) registered to the Enterprise prior to the cancellation of the invitation .`,
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