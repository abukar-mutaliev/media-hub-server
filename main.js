require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const sequelize = require("./db/db");
const router = require("./routes/index");
const errorHandler = require("./middlewares/errorHandlingMiddleware");

const app = express();
const PORT = process.env.SERVER_PORT || 3000;
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("Соединение с БД было успешно установлено");
    await sequelize.sync();
    app.use("/api", router);
    app.use("/image", express.static(path.resolve(__dirname, "image")));
    app.use(express.static(path.join(__dirname, "../build")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../build", "index.html"));
    });
    app.use(router);

    app.listen(PORT, () =>
      console.log(`Сервер запущен по адресу http://localhost:${PORT}`)
    );
  } catch (e) {
    console.log("Невозможно выполнить подключение к БД: ", e);
  }
};

start();
