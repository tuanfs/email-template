const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { transporter, mailOptions } = require("./send-email");

const app = express();
const port = 3001;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

app.post("/send-email", (req, res) => {
  const ticketId = req.query.ticketId;
  const ticketName = req.query.ticketName;
  const token = jwt.sign({ ticketId, ticketName }, "shhhhh", {
    expiresIn: 3600
  });

  const htmlContent = `<!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Star rating using pure CSS</title>
      <style>
              body,
              html {
                margin: 0;
                padding: 0;
              }
  
              .rate {
                float: left;
                height: 46px;
                padding: 0 10px;
              }
  
              .rate label {
                cursor: pointer;
                float: left;
                width: 1em;
                overflow: hidden;
                white-space: nowrap;
                cursor: pointer;
                font-size: 30px;
                color: #ccc;
              }
  
              .rate label:hover,
              .rate label:hover ~ label {
                color: #deb217;
              }
  
              .star {
                opacity: 0;
                position: relative;
                top: -10px;
              }
  
              .star {
                display: none;
              }
  
            .rate input[type="radio"]:checked ~ label {
              color: #ffc700;
            }
  
            .rate label:hover,
            .rate label:hover ~ label {
              color: #deb217;
            }
  
            .rate input[type="radio"]:checked + label:hover,
            .rate input[type="radio"]:checked + label:hover ~ label,
            .rate input[type="radio"]:checked ~ label:hover,
            .rate input[type="radio"]:checked ~ label:hover ~ label,
            .rate label:hover ~ input[type="radio"]:checked ~ label {
              color: #c59b08;
            }

            #star1:checked + label{
              color: red;
            }
    
      </style>
    </head>
  
    <body>
      <form method="post" action="http://localhost:3001/submit">
        <div class="rate">
          <input type="radio" class="star" id="star1" name="rate" value="1" />
          <label style="margin-right: 20px" for="star1">&#9733;</label>
          <input type="radio" class="star" id="star2" name="rate" value="2" />
          <label style="margin-right: 20px" for="star2">&#9733;</label>
          <input type="radio" class="star" id="star3" name="rate" value="3" />
          <label style="margin-right: 20px" for="star3">&#9733;</label>
          <input type="radio" class="star" id="star4" name="rate" value="4" />
          <label style="margin-right: 20px" for="star4">&#9733;</label>
          <input type="radio" class="star" id="star5" name="rate" value="5" />
          <label style="margin-right: 20px" for="star5">&#9733;</label>
        </div>
        <br />
        <label style="margin-right: 20px">Comment</label>
        <textarea name="comment" rows="4" cols="50"></textarea>
        <button type="submit">Submit</button>
      </form>
    </body>
  </html>
  `;
  transporter.sendMail({ ...mailOptions, html: htmlContent }, (error, info) => {
    if (error) {
      console.error("Send email failed", error);
      res.status(400).send("Send email failed");
    } else {
      console.log("Send email successful", info.response);
      res.status(200).send("Send email successful");
    }
  });
});

app.post("/submit", (req, res) => {
  const body = req.body;
  console.log(body);
  const { email, name, rate, comment } = body;
  return res
    .status(301)
    .redirect(
      `http://localhost:3000/thanks?ticketName=${rate}&requester=${comment}&result=success`
    );
});

app.get("/close", (req, res) => {
  const token = req.query.token;
  let result = "expired";
  try {
    const { ticketName, ticketId } = jwt.verify(token, "shhhhh");
    if (ticketId) {
      const requester = "Tuan Le";
      // call api close ticket by ticketId =>> Close

      const response = true;
      if (response) {
        return res
          .status(301)
          .redirect(
            `http://localhost:3000/thanks?ticketName=${ticketName}&requester=${requester}&result=success`
          );
      }
      result = "notfound";
      throw new Error();
    }
  } catch (error) {
    return res
      .status(301)
      .redirect(`http://localhost:3000/thanks?result=${result}`);
  }
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
