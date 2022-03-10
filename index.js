const express = require("express");
const app = express();
const morgan = require("morgan");
const { db, User, Page } = require("./models");
db.authenticate().then(() => {
  console.log("connected to the database");
});

app.use(morgan("dev"));
// app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res, next) => {
  try {
    res.send("hello world");
  } catch (error) {
    next(error);
  }
});

const PORT = 3000;

app.listen(PORT, async () => {
  // await db.sync();
  await db.sync({ force: true });
  console.log(`App listening in port ${PORT}`);
});
