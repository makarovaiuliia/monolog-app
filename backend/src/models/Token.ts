const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  refreshToken: { type: String, required: true },
  user: { type: mongoose.Schema.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Token", tokenSchema);
