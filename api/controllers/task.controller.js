// Load module dependencies
const express = require("express");
// Create mocked up data
const tasks = [
  {
    id: 0,
    title: "titulo 1",
    description: "retete 1",
    status: false
  },
  {
    id: 19,
    title: "titulo 2",
    description: "ertretre2",
    status: true
  }
];
// Create task router
const router = express.Router();
// Define routes
// Get all tasks
router.get("/", (req, res) => {
  const response = {
    status: "success",
    data: tasks
  };

  res.status(200).json(response);
});
// Get selected task
router.get("/:id", (req, res) => {
  const task = tasks.filter(obj => obj.id === +req.params.id);

  const response = {
    status: task.length ? "success" : "error",
    data: task
  };

  res.status(200).json(response);
});

// Create task
router.post("/", (req, res) => {
  // Create unique id
  const id = Date.now();
  if (!req.body.title || !req.body.description)
    res.send({
      status: "error",
      message: "Debe completar titulo y descripcion"
    });

  const newTask = {
    id,
    title: req.body.title,
    description: req.body.description,
    status: false
  };

  // Add task to collection
  tasks.push(newTask);

  const response = {
    status: "success",
    data: newTask
  };

  // Return id of created task
  res.status(201).json(response);
});
// Update task
router.put("/:id", (req, res) => {

  const indexTask = tasks.findIndex(obj => obj.id === +req.params.id);

if (!req.body.title || !req.body.description)
res.send({
  status: "error",
  message: "Debe completar titulo y descripcion"
});

if(indexTask === -1)
res.send({
  status: "error",
  message: "La tarea no existe"
});

const newTask = {
  id : req.params.id,
  title: req.body.title,
  description: req.body.description,
  status: false
};
  
  tasks[indexTask] = newTask;

  res.status(200).json(newTask);
});
// Patch task
router.patch("/:id", (req, res) => {
  tasks[req.params.id] = Object.assign({}, tasks[req.params.id], req.body);
  res.status(200).json(req.params.id);
});
// Delete task
router.delete("/:id", (req, res) => {
  const indexTask = tasks.findIndex(obj => obj.id === +req.params.id);

  const response = {
    status: indexTask === -1 ? "error" : "success",
  };

  delete tasks[indexTask];

  res.status(200).json(response);
});
// Export route to be re-used
module.exports = router;
