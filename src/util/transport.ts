import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "tiengkimlang10@gmail.com",
    pass: "hbxi xojz ybgk bewm",
  },
});
