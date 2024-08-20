const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

// Cron jobs
const PORT = 3016;
const bodyParser = require("body-parser");

require("dotenv").config();
const cors = require("cors");

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

app.use("/upload-image", require("./app/upload-image"));

app.use("/user", require("./app/routes/Users/customerRoute"));


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
