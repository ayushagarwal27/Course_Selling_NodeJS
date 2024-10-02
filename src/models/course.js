const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: { type: String },
  description: { type: String },
  price: { type: Number },
  imageUrl: { type: String },
  creatorsId: { type: mongoose.ObjectId },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
