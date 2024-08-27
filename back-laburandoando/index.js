const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const { fillDB } = require("./src/common/functions");
require('./src/auth/auth');
const session = require('express-session')
const passport = require('passport');
const { localStrategy, serializeUser, deserializeUser } = require('./src/middlewares/passport.middlewares');
/* rutas */

const user = require("./src/routes/user.route");
const workerRouter = require("./src/routes/worker.route");
const categoryRouter = require("./src/routes/category.route");
const authRouter = require("./src/routes/auth.route");
const workRouter = require("./src/routes/work.route");
const reviewRouter = require("./src/routes/review.route");
const feedBackRouter = require("./src/routes/feedBack.route");


const app = express();
app.use(cors());

const port = 3000;

app.use(express.json({ limit: "50mb" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'your_secret_key', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Rutas para la aplicación
app.use("/user", user);
app.use("/worker", workerRouter);
app.use("/category", categoryRouter);
app.use("/auth", authRouter)
app.use("/work", workRouter);
app.use("/review", reviewRouter);
app.use("/feedback", feedBackRouter)

mongoose
  .connect(process.env.MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {

    fillDB();

    app.listen(port, () => {
      console.log(`La aplicación se está ejecutando en el puerto ${port}`);
    });
  })
  .catch(() => {
    console.log("Hubo un error en la conexión a la base de datos...");
  });
