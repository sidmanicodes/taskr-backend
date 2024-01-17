const mongoose = require("mongoose");
const Label = require("../models/labelSchema");

// Get
exports.getAll = (req, res) => {
  Label.find()
    .sort({ createdAt: -1 })
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(400).send({ message: err.message }));
};

// Create
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    return res.status(404).send({ message: "Please enter a valid request" });
  }

  // Create label
  const newLabel = new Label(req.body);

  // Save user to database
  newLabel
    .save()
    .then((data) => res.status(200).send(data))
    .catch((err) =>
      res.status(500).send({ message: err.message || "Something went wrong" })
    );
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
  Label.findOneAndUpdate({ _id: id }, req.body, { new: true })
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
  Label.findByIdAndDelete({ _id: id })
    .then((data) => res.status(200).send(data))
    .catch((err) =>
      res
        .status(500)
        .send({ message: err.message || `Could not delete user with id ${id}` })
    );
};
