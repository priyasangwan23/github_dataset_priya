const mongoose = require("mongoose");

const datasetSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "ID is required"],
      unique: true,
      trim: true,
    },
    instruction: {
      type: String,
      required: [true, "Instruction is required"],
    },
    input: {
      type: String,
      default: "",
    },
    output: {
      type: String,
      default: "",
    },
    metadata: {
      type: {
        type: String,
        trim: true,
      },
      code_element: {
        type: String,
        trim: true,
      },
      repo_name: {
        type: String,
        trim: true,
      },
      file_path: {
        type: String,
        trim: true,
      },
      source_type: {
        type: String,
        trim: true,
      },
    },
  },
  {
    timestamps: true, // Automatically creates createdAt and updatedAt fields
  }
);

// Create an index on repo_name within the metadata object for faster searches
datasetSchema.index({ "metadata.repo_name": 1 });

module.exports = mongoose.model("Dataset", datasetSchema);
