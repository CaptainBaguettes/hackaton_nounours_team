const express = require("express");
const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const bodyParser = require("body-parser");
const datasRoute = require("./routes/data");
const userRoutes = require("./routes/user");
const jobsRoute = require("./routes/jobs");

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
app.use("/api", jobsRoute);

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

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API Hackaton Nounours Team",
      version: "1.0.0",
      description: "Documentation de l'API",
      contact: {
        name: "Équipe Nounours"
      },
      servers: [
        {
          url: "http://localhost:3000/api",
          description: "Serveur de développement"
        }
      ]
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },
  apis: ["./routes/*.js", "./models/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app;
