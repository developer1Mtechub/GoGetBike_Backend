const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);
const twilio = require('twilio');

const db = require("./app/config/db.config");

// Cron jobs
const PORT = 3016;
const bodyParser = require("body-parser");

require("dotenv").config();
const cors = require("cors");
const { accountSid, authToken } = require("./app/urls");

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
    origin: "*",
  })
);

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use("/uploads", express.static("uploads"));

// app.use("/upload-image", require("./app/upload-image"));

app.use("/user", require("./app/routes/Users/customerRoute"));
app.post("/test-twilio", (req, res) => {
  // Create a Twilio client
  const client = new twilio(accountSid, authToken);

  // Send a message
  client.messages
    .create({
      body: 'Your verification code is 123456',
      from: '+12564880595',  // Replace with your Twilio phone number from dashboard
      to: '+923135059779'     // Replace with the recipient's phone number
    })
    .then(message => {
      console.log(`Message sent with SID: ${message.sid}`);
      res.status(200).json({ success: true, message: 'Message sent successfully' });
    })
    .catch(error => {
      console.error('Error sending message:', error);
      res.status(500).json({ success: false, message: 'Failed to send message' });
    });
});
// make api for just say server is running when runs localhost:5000 on google
app.get("/", (req, res) => {
  res.status(200).json({ error: false, message: "Server is running" });
});

server.listen(PORT, () =>
  console.log(`
 ################################################
       Server listening on port: ${PORT}
 ################################################
 `)
);
