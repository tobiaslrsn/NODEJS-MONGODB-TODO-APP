require("dotenv").config();

const express = require("express");
const exphbs = require("express-handlebars");
const app = express();

const todosRouter = require("./routes/todo-route.js");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine(
  "hbs",
  exphbs.engine({
    extname: ".hbs",
    defaultLayout: "main",
  })
);

app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.status(200);
});

app.use("/todos", todosRouter);

app.listen(8080, () => {
  console.log("///// TODO APP RUNNING ON http://localhost:8080/todos");
});
