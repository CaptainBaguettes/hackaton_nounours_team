const express = require("express");
const datasRoute = require("./routes/data");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/user");

const app = express();

app.use(bodyParser.json());
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/api", userRoutes);

app.use(
  "/api/datas",
  (req, res, next) => {
    if (req.body && typeof req.body === "object") {
      for (const key in req.body) {
        if (typeof req.body[key] === "string") {
          req.body[key] = req.body[key].replace(/<[^>]*>?/gm, ""); // Remove HTML tags
        }
      }
    }
    next();
  },
  datasRoute
);

module.exports = app;
