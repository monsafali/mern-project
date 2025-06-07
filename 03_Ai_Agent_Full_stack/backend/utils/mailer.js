import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const senMail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAILTRAP_SMTP_HOST,
      port: process.env.MAILTRAP_SMTP_PORT,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAILTRAP_SMTP_USE,
        pass: process.env.MAILTRAP_SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: "monsaf ali",
      to: to,
      subject: subject,
      text: text, // plain‑text body
    });

    console.log("Message sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Mail Error", error.message);
    throw error;
  }
};
