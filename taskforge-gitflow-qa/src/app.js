const express = require("express");

const app = express();
app.use(express.json());

let tasks = [
  { id: 1, title: "Primer task", done: false },
  { id: 2, title: "Segundo task", done: true },
];

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const { title } = req.body;

  if (!title || String(title).trim().length < 3) {
    return res.status(400).json({ error: "title requerido (min 3 caracteres)" });
  }

  const nextId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

  const task = {
    id: nextId,
    title: String(title).trim(),
    done: false,
  };

  tasks.push(task);
  res.status(201).json(task);
});

app.put("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const idx = tasks.findIndex(t => t.id === id);

  if (idx === -1) return res.status(404).json({ error: "not found" });

  const { title, done } = req.body;

  if (title !== undefined) tasks[idx].title = String(title).trim();
  if (done !== undefined) tasks[idx].done = Boolean(done);

  res.json(tasks[idx]);
});

app.delete("/api/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  const before = tasks.length;

  tasks = tasks.filter(t => t.id !== id);

  if (tasks.length === before) return res.status(404).json({ error: "not found" });

  res.status(204).send();
});

module.exports = app;
