const express = require("express");
const router = express.Router();

let todos = [];

router.get("/", (req, res) => {
    res.json(todos);
});

router.post("/", (req, res) => {
    const todo = {
        id: Date.now(),
        text: req.body.text,
        completed: false
    };
    todos.push(todo);
    res.status(201).json(todo);
});

router.put("/:id", (req, res) => {
    const id = Number(req.params.id);
    todos = todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    res.json({ message: "todo updated" });
});

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);
    todos = todos.filter(todo => todo.id !== id);
    res.json({ message: "todo deleted" });
});

module.exports = router;
