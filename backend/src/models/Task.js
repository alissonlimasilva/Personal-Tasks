const mongoose = require("mongoose");

const { Schema } = mongoose;

const TaskSchema = new Schema({
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  date: { type: Date },
  isDone: { type: Boolean, default: false },
  latitude: Number,
  longitude: Number,
  user: { type: Schema.Types.ObjectId, ref: "User" }
});

module.exports = mongoose.model("Task", TaskSchema);
