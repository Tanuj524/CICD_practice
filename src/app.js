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







app.get("/tasks", async (req, res) => {
    const tasks = await getTasks();
    res.json(tasks);
});





app.get("/tasks/:id", async (req, res) => {
    const id = Number(req.params.id);

    const task = await getTaskById(id);

    if (!task) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    res.json(task);
});

app.post("/tasks", async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({
            error: "Title is required"
        });
    }

    const task = await createTask(title);

    res.status(201).json(task);
});

app.put("/tasks/:id", async(req, res) => {
    const id = Number(req.params.id);
    const { title, completed } = req.body;

    const task = await updateTask(id, title, completed);

    if (!task) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    res.json(task);
});

app.delete("/tasks/:id", async (req, res) => {
    const id = Number(req.params.id);

    const deleted = await deleteTask(id);

    if (!deleted) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    res.status(204).send();
});


export default app;