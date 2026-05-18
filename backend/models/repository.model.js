const mongoose = require("mongoose");

const repositorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Repository name is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    language: {
      type: String,
      trim: true,
    },
    stars: {
      type: Number,
      default: 0,
    },
    forks: {
      type: Number,
      default: 0,
    },
    owner: {
      type: String,
      required: [true, "Owner is required"],
      trim: true,
    },
    url: {
      type: String,
      trim: true,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Repository", repositorySchema);
