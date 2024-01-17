const mongoose = require("mongoose");
const validColors = require("../config/labelColors");
const { validate } = require("./todoSchema");

const labelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    color: {
      type: String,
      required: true,
      validate,
      validate: {
        validator: (value) => {
          return validColors.includes(value);
        },
        message: (props) => `${props.value} is not a valid color`,
      },
    },
  },
  { timestamps: true }
);

const Label = mongoose.model("Label", labelSchema);
module.exports = Label;
