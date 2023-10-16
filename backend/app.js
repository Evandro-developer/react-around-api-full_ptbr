const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const celebrate = require("celebrate");
const { httpRequestLogger, httpErrorLogger } = require("./middleware/logger");
const limiter = require("./utils/limiter");
const routes = require("./routes/index");
const { createUser, login } = require("./controllers/users");
const BaseError = require("./errors/BaseError");
const {
  validateUserSignup,
  validateUserLogin,
} = require("./utils/validations");

require("dotenv-flow").config();

const app = express();
const PORT = process.env.PORT;

const isProduction = process.env.NODE_ENV === "production";

const corsOptions = {
  origin: [
    "https://aroundfinal.com.br",
    "https://www.aroundfinal.com.br",
    "https://reactjs.aroundfinal.com.br",
    "https://www.reactjs.aroundfinal.com.br",
    "https://vanillajs.aroundfinal.com.br",
    "https://www.vanillajs.aroundfinal.com.br",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(isProduction ? corsOptions : {}));
app.options("*", cors(isProduction ? corsOptions : {}));
app.use(helmet());

app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

console.log("Node Environment:", process.env.NODE_ENV);
console.log("API URL:", process.env.API_URL);
console.log("PORT:", process.env.PORT);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conexão com o MongoDB bem-sucedida!");
  })
  .catch((error) => {
    console.error("Erro na conexão com o MongoDB:", error);
  });

app.use(httpRequestLogger);

// Aplica o limitador de taxa as rotas /signup e /signin
app.post("/signup", limiter, validateUserSignup, createUser);
app.post("/signin", limiter, validateUserLogin, login);

app.use("/", routes);

app.use(httpErrorLogger);

// Tratador de erros de validação do Celebrate
app.use((err, req, res, next) => {
  if (celebrate.isCelebrateError(err)) {
    const errors = err.details;
    let errorMessage = "Erro de validação: ";
    errors.forEach(({ message }) => {
      errorMessage += `${message}, `;
    });
    return res.status(400).json({ error: errorMessage });
  }
  next(err);
  return null;
});

// Tratador de erros personalizado
app.use((err, req, res, next) => {
  if (err instanceof BaseError) {
    // Verifica se é uma instância de BaseError
    return res.status(err.statusCode).json({ message: err.message });
  }

  console.error(err.stack);
  return res.status(500).json({ message: "Erro Interno do Servidor" });
});

app.listen(PORT, () => {
  console.log(`Servidor escutando em http://127.0.0.1:${PORT}`);
});

module.exports = app;
