const express = require("express");
const { dbConnection } = require("./db/dbConnection");
const app = express();
const cors = require("cors");
const { readdirSync } = require("fs");
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT || 3000;

// middlewares
app.use(cors());
app.use(express.json());

// routes
readdirSync("./routes").map((route) =>
  app.use("/api", require("./routes/" + route))
);

// serve statics files
app.use("/public", express.static(path.join(__dirname, "public")));

const server = async () => {
  try {
    await dbConnection();
    app.listen(PORT, () => {
      console.log("Listening on port:", PORT);
    });
  } catch (error) {
    console.error("Error starting server:", error);
  }
};

server();
