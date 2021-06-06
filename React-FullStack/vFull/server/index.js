const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const db = require("./models");
// Routers
const postRouter = require("./routes/Posts");
app.use("/posts", postRouter);
const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);
const profileRouter = require("./routes/profile");
app.use("/profile", profileRouter);
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

db.sequelize.sync({ force: true }).then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 3001");
  });
});
