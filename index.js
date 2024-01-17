const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const labelRoutes = require("./routes/labelRoutes");
const todoRoutes = require("./routes/todoRoutes");

const https = require("https");
const fs = require("fs");

const options = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.crt"),
};

// Configure environment
dotenv.config();

// Create Express app
const app = express();

const port = process.env.PORT || 8000;
const connectionURL = process.env.MONGO_URI;

// Mount middlewares
app.use(express.json());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB config
mongoose
  .connect(connectionURL)
  .then(() => {
    // Create an HTTPS server
    https.createServer(options, app).listen(port, () => {
      console.log(`Listening on port ${port} with HTTPS`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });

// Mount routes as middleware
app.use("/api/labels", labelRoutes);
app.use("/api/todos", todoRoutes);
// require("./prod")(app);
