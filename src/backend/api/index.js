/*
 *
 * Use the command below to start the project:
 * $ npm run start
 *
 */

import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import connectDb from "./config/db.js";
import dashboardRoutes from "./routes/controllers/dashboard.controller.js";
import emailRoutes from "./routes/controllers/smtp.controller.js";
import nluRoutes from "./routes/controllers/nlu.controller.js";
import sttRoutes from "./routes/controllers/stt.controller.js";
import userRoutes from "./routes/controllers/user.controller.js";
import requestLogger from "./utils/logging.js";
import swaggerDoc from "./utils/swagger.cjs";
const app = express();
const port = 3001;
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuração do CORS
app.use(cors());

// Middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "..", "frontend", "public")));

// Connect to Database
connectDb();

// Logs
app.use(requestLogger);

// Rotas
app.get("/", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "..", "frontend", "public", "index.html")
  );
});
app.use(dashboardRoutes);
app.use(userRoutes);
app.use(emailRoutes);
app.use(nluRoutes);
app.use(sttRoutes);

app.use(express.static(path.join(__dirname, "..", "..", "frontend", "public")));

// Swagger Docs
swaggerDoc(app, port);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
