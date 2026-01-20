const express = require("express");
const cors = require("cors");

const app = express();

// ✅ allow frontend + docker + jenkins
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "DELETE"],
}));

app.use(express.json());

let todos = [];

// GET
app.get("/api/todos", (req, res) => {
    res.json(todos);
});

// POST
app.post("/api/todos", (req, res) => {
    const todo = {
        id: Date.now(),
        text: req.body.text,
    };
    todos.push(todo);
    res.status(201).json(todo);
});

// DELETE
app.delete("/api/todos/:id", (req, res) => {
    todos = todos.filter(t => t.id != req.params.id);
    res.json({ message: "Deleted" });
});

// 🔥 IMPORTANT: bind to 0.0.0.0
const PORT = 5000;
app.listen(PORT, "0.0.0.0", () =>
    console.log(`Backend running on port ${PORT}`)
);
