const mongoose = require("mongoose");
const Label = require("../models/labelSchema");
const Todo = require("../models/todoSchema");

// Get
exports.getAll = (req, res) => {
  Todo.find()
    .sort({ createdAt: -1 })
    .populate("label", "name color")
    .exec()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send({ message: err.message }));
};

// Create
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(404).send({ message: "Please enter a valid request" });
  }

  console.log(req.body);

  // Create todo
  const newTodo = new Todo(req.body);

  // Associated label
  Label.findById(req.body.label)
    .then((data) => (newTodo.label = data))
    .catch((err) => {
      return res.status(500).send({ message: err.message });
    });

  console.log(newTodo);

  newTodo
    .save()
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Update
exports.update = (req, res) => {
  const { id } = req.params;

  // Validate request
  if (!req.body) {
    return res.status(404).send({ message: "Please enter a valid request" });
  }

  // Check if ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`${id} is an invalid ID`);
  }

  // Update label in db
  Todo.findOneAndUpdate({ _id: id }, req.body, { new: true })
    .populate("label", "name color")
    .exec()
    .then((data) => res.status(200).send(data))
    .catch((err) =>
      res
        .status(500)
        .send({ message: err.message || `Could not update user with id ${id}` })
    );
};

// Delete
exports.delete = (req, res) => {
  const { id } = req.params;

  // Validate request
  if (!req.body) {
    return res.status(404).send({ message: "Please enter a valid request" });
  }

  // Check if ID is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send(`${id} is an invalid ID`);
  }

  // Delete label in db
  Todo.findByIdAndDelete({ _id: id })
    .populate("label", "name color")
    .exec()
    .then((data) => res.status(200).send(data))
    .catch((err) =>
      res
        .status(500)
        .send({ message: err.message || `Could not delete user with id ${id}` })
    );
};
