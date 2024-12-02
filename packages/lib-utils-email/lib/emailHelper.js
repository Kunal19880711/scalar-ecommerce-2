import path from "path";
import url from "url";
import fs from "fs";
import nodemailer from "nodemailer";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const transport = nodemailer.createTransport({
  host: process.env.GOOGLE_EMAIL_HOST,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.GOOGLE_APP_USERNAME,
    pass: process.env.GOOGLE_APP_PASSWORD,
  },
});

export const EMailTemplates = {
  Otp: fs.readFileSync(
    path.join(new URL('.', import.meta.url).pathname, "emailTemplates", "otp.html"),
    "utf-8"
  ),
};

const fillTemplate = (content, mapping) => {
  for (let key in mapping) {
    content = content.replaceAll(`#{${key}}`, mapping[key]);
  }
  return content;
};

export const emailHelper = async (emailContent, recieverEmail, mapping) => {
  const htmlContent = fillTemplate(emailContent, mapping);
  const emailDetails = {
    to: recieverEmail,
    from: process.env.GOOGLE_APP_USERNAME,
    subject: "Mail from Scalar E-Commerce",
    html: htmlContent,
  };

  try {
    await transport.sendMail(emailDetails);
  } catch (err) {
    if (err.response && err.response.body) {
      console.error("Error sending email:", err.response.body);
    } else {
      console.error("Error occurred:", err.message);
    }
  }
};
