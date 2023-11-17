const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const packageFile = require("../package.json");

const { version } = packageFile;

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Minsky API Documentation",
      version,
    },
    servers: [
      {
        url: "http://localhost:3001",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        },
      },
    },
  },
  apis: ["routes/controllers/*.js"],
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const swaggerSpec = swaggerJsdoc(options);

const swaggerDoc = (app, port) => {
  // Swagger page
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, { explorer: true })
  );

  // Docs in JSON format
  app.get("/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application-json");
    res.send(swaggerSpec);
  });

  console.log(`Docs available at http://localhost:${port}/docs`);
};

module.exports = swaggerDoc;
