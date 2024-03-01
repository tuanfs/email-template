const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tuanle.devops@gmail.com",
    pass: "nxwn rkxg mfgj kjyf"
  }
});

const htmlContent = `
<a href=" http://localhost:3001/login?username=tuanlv51&password=tuan  ">
Login to website
</a>
`;

const mailOptions = {
  from: "tuanle.devops@gmail.com",
  to: "tuanfs.vn@gmail.com",
  subject: "Tiêu đề của email test template",
  html: htmlContent
};

module.exports = {
  mailOptions,
  transporter
};
