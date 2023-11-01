import nodemailer from "nodemailer";
async function sendPasswordResetEmail(email: any, token: any) {
  const transporter = nodemailer.createTransport({
    service: "Gmail", // e.g., 'Gmail'
    auth: {
      user: "1900950100023@coet.in",
      pass: "oxygenO2",
    },
  });

  const resetLink = `http://localhost:3000?token=${token}`;

  const mailOptions = {
    from: "1900950100023@coet.in",
    to: email,
    subject: "Password Reset",
    text: `Click the following link to reset your password: ${resetLink}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Password reset email sent successfully.");
  } catch (error) {
    console.error("Error sending password reset email: " + error);
  }
}

export default sendPasswordResetEmail;
