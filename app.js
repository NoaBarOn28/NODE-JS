require("./middlewares/connectToDb");
const express = require("express");
const app = express();
const usersRouter = require("./Routes/Users/userRouter");
const cardsRouter = require("./Routes/Cards/cardsRouter");
const chalk = require("chalk");
const morgan = require("morgan");
const cors = require("cors");

app.use(morgan(chalk.cyan(":method :url :status :response-time ms")));
app.use(
  cors()
  //origin: "http://127.0.0.1:5500",
  // optionsSuccessStatus: 200,
);

app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/cards", cardsRouter);

const PORT = 8181;
app.listen(PORT, () =>
  console.log(chalk.blueBright.bold(`server run on: http://:localhost:${PORT}`))
);
