const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  content: String,
  title: String,
  mood: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Entry", entrySchema);
