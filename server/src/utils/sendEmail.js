import nodemailer from "nodemailer";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
dotenv.config();

export const sendEmail = asyncHandler(async ({ email, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_NAME,
        pass: process.env.APP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: '"Manager book 👻" <haidangson.dev@gmail.com>',
      to: email,
      subject: subject,
      html: html,
    });

    return info;
  } catch (error) {
    throw new Error("Quá trình gửi email bị lỗi");
  }
});
