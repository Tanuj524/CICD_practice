import express from "express";

import {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
} from "./tasks.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Task API is running"
    });
});

app.get("/tasks", (req, res) => {
    res.json(getTasks());
});

app.get("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);

    const task = getTaskById(id);

    if (!task) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    res.json(task);
});

app.post("/tasks", (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({
            error: "Title is required"
        });
    }

    const task = createTask(title);

    res.status(201).json(task);
});

app.put("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);
    const { title, completed } = req.body;

    const task = updateTask(id, title, completed);

    if (!task) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
    const id = Number(req.params.id);

    const deleted = deleteTask(id);

    if (!deleted) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    res.status(204).send();
});


export default app;