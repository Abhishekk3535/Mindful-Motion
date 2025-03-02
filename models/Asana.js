const mongoose = require("mongoose");

const AsanaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  difficulty: { type: Number, required: true, min: 1, max: 5 },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Asana", AsanaSchema);
