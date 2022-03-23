const express = require("express");
const utils = require("../utils.js");
const db = require("../database.js");
const router = express.Router();
const { ObjectId } = require("mongodb");

//READ ALL TODOS
router.get("/", async (req, res) => {
  const collection = await db.getTodosCollection();
  const todos = await collection.find().toArray();

  res.render("todo-app/todos-list", { todos });
});
// ! READ ALL TODOS

// POST TODO

router.post("/", async (req, res) => {
  const date = new Date();

  const todos = {
    title: req.body.title,
    date: date.toLocaleString(),
    description: req.body.description,
    deadline: req.body.deadline,
    done: false,
  };
  if (utils.validatePost(todos)) {
    const todosCollection = await db.getTodosCollection();
    await todosCollection.insertOne(todos);

    res.redirect("/todos");
  } else {
    res.render("todo-app-errors/error-start", {
      title: todos.title,
      description: todos.description,
      deadline: todos.deadline,
    });
  }
});

// ! POST TODO

// GET ERROR HBS FILES
router.get("/status", async (req, res) => {
  res.render("todo-app-errors/error-start");
});

router.get("/status/edit", async (req, res) => {
  res.render("todo-app-errors/error-edit");
});
// ! GET ERROR HBS FILES

// GET CHECKED OR UNCHECKED TODOS
router.get("/checked-todos", async (req, res) => {
  const collection = await db.getTodosCollection();
  const todos = await collection.find().toArray();

  res.render("todo-app/todos-done", { todos });
});

router.get("/unchecked-todos", async (req, res) => {
  const collection = await db.getTodosCollection();
  const todos = await collection.find().toArray();

  res.render("todo-app/todos-not-done", { todos });
});
// !GET CHECKED OR UNCHECKED TODOS

// SORT BY DATE
router.get("/new-to-old", async (req, res) => {
  const collection = await db.getTodosCollection();
  const todos = await collection.find().sort({ date: -1 }).toArray();

  res.render("todo-app/todos-list", { todos, redir: "/todos/new-to-old" });
});

router.get("/old-to-new", async (req, res) => {
  const collection = await db.getTodosCollection();
  const todos = await collection.find().sort({ date: 1 }).toArray();

  res.render("todo-app/todos-list", { todos, redir: "/todos/old-to-new" });
});
// ! SORT BY DATE

// READ SINGLE TODO
router.get("/:id", async (req, res, next) => {
  let id = undefined;

  try {
    id = ObjectId(req.params.id);
  } catch {
    next();
  }

  if (id) {
    const collection = await db.getTodosCollection();
    collection.findOne({ _id: id }, (err, todos) => {
      if (todos) {
        res.render("todo-app/todos-single", todos);
      } else {
        res.render(404);
        next();
      }
    });
  }
});
// ! READ SINGLE TODO

// CHECK / UNCHECK
router.post("/:id/done", async (req, res) => {
  const id = ObjectId(req.params.id);
  const collection = await db.getTodosCollection();

  const checked = {
    done: true,
  };

  await collection.updateOne({ _id: id }, { $set: checked });

  if (req.body.redir) {
    res.redirect(req.body.redir);
  } else {
    res.redirect("/todos");
  }
});

router.post("/:id/not-done", async (req, res) => {
  const id = ObjectId(req.params.id);
  const collection = await db.getTodosCollection();
  const unchecked = {
    done: false,
  };

  await collection.updateOne({ _id: id }, { $set: unchecked });
  if (req.body.redir) {
    res.redirect(req.body.redir);
  } else {
    res.redirect("/todos");
  }
});
// ! CHECK / UNCHECK

// DELETE TODO
router.post("/:id", async (req, res, next) => {
  let id = undefined;

  try {
    id = ObjectId(req.params.id);
  } catch {
    next();
  }
  if (id) {
    const collection = await db.getTodosCollection();
    await collection.deleteOne({ _id: id });

    res.redirect("/todos");
  } else {
    res.status(400);
  }
});
// ! DELETE TODO

// EDIT TODO
router.get("/edit/:id", async (req, res, next) => {
  let id = undefined;

  try {
    id = ObjectId(req.params.id);
  } catch {
    next();
  }

  if (id) {
    const collection = await db.getTodosCollection();
    collection.findOne({ _id: id }, (err, todos) => {
      if (todos) {
        res.render("todo-app/todos-update", todos);
      } else {
        next();
      }
    });
  }
});

router.post("/edit/:id", async (req, res, next) => {
  let id = undefined;

  try {
    id = ObjectId(req.params.id);
  } catch {
    next();
  }
  if (id) {
    const todo = {
      title: req.body.title,
      description: req.body.description,
      deadline: req.body.deadline,
    };

    if (utils.validatePost(todo)) {
      const collection = await db.getTodosCollection();
      await collection.updateOne({ _id: id }, { $set: todo });
      res.redirect(`/todos/${id}`);
    } else {
      res.render("todo-app/todos-update", {
        error: "YOU NEED TO ENTER SOMETHING",
        _id: id,
      });
    }
  }
});
/* ! EDIT TODO */

module.exports = router;
