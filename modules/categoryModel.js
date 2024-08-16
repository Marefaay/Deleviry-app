// const { required } = require("/joi");
// const { required } = require("joi");
const mongoose = require("mongoose");
//catgory schema
const categorySchema = new mongoose.Schema(
  {
    categoryId: {
      type: Number,
      required: true,
      default: 0,
    },
    categoryTitle: {
      type: String,
      required: true,
    },
    numberOfProducts: {
      type: Number,
      default: 0,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  { timestamps: true }
);
const categoryModel = mongoose.model("Catgoery", categorySchema);
module.exports = categoryModel;
