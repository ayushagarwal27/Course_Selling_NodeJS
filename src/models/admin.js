const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const adminSchema = new Schema({
  name: { type: String, minSize: 5, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
