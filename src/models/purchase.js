const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const purchaseSchema = new Schema({
  userId: mongoose.ObjectId,
  courseId: mongoose.ObjectId,
});

const Purchase = mongoose.model("Purchase", purchaseSchema);

module.exports = Purchase;
