import { transport } from "./transport";

export async function nodemailer(email: string, token: string) {
  const expirationTime = new Date(Date.now() + 2000);
  const mailOptions = {
    from: "tiengkimlang10@gmail.com", // Replace with your sender email
    to: email,
    subject: "Verify Your Email Address",
    text: `Click on this link to verify your email : http://localhost:5000/user/verify?token=${token} ${expirationTime}`,
  };

  await transport.sendMail(mailOptions);
}
