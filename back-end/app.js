const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { transporter, mailOptions } = require("./send-email");

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.post("/send-email", (req, res) => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Send email failed", error);
      res.status(400).send("Send email failed");
    } else {
      console.log("Send email successful", info.response);
      res.status(200).send("Send email successful");
    }
  });
});

app.get("/login", (req, res) => {
  console.log(req.query);
  if (req.query.username === "tuanlv51") {
    res.redirect("http://localhost:3000/");
  } else {
    res.status(400).send("Login failed");
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
