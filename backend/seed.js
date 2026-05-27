require("dotenv").config();
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Dataset = require("./models/dataset.model");

/**
 * Main function to seed datasets from dataset.json into MongoDB.
 */
const seedData = async () => {
  try {
    // 1. Establish connection to MongoDB
    console.log("⏳ Connecting to MongoDB...");
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is not defined in .env file.");
    }
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    // 2. Resolve dataset path and check file existence
    const filePath = path.join(__dirname, "data", "dataset.json");
    console.log(`📂 Reading dataset file from: ${filePath}`);
    if (!fs.existsSync(filePath)) {
      throw new Error(`dataset.json not found at expected path: ${filePath}`);
    }

    // 3. Read and parse JSON content
    const rawData = fs.readFileSync(filePath, "utf-8");
    const datasets = JSON.parse(rawData);
    console.log(`📦 Loaded ${datasets.length} dataset records from JSON.`);

    // 4. Deduplicate datasets by the unique 'id' field in memory to avoid unique constraint violations
    const uniqueDatasets = [];
    const seenIds = new Set();
    for (const dataset of datasets) {
      if (dataset && dataset.id) {
        const trimmedId = dataset.id.trim();
        if (!seenIds.has(trimmedId)) {
          seenIds.add(trimmedId);
          uniqueDatasets.push(dataset);
        }
      }
    }
    const duplicateCount = datasets.length - uniqueDatasets.length;
    if (duplicateCount > 0) {
      console.log(`⚠️ Ignored ${duplicateCount} duplicate records in dataset.json to prevent duplicate key errors.`);
    }

    // 5. Delete existing documents
    console.log("🧹 Deleting existing datasets...");
    const deleteResult = await Dataset.deleteMany({});
    console.log(`🗑️ Deleted ${deleteResult.deletedCount} existing datasets.`);

    // 6. Bulk insert the new datasets
    console.log("📥 Inserting new datasets...");
    const insertResult = await Dataset.insertMany(uniqueDatasets);
    console.log("✅ Data Imported Successfully");
    console.log(`✨ Successfully seeded ${insertResult.length} datasets.`);

    // 6. Close the connection cleanly
    await mongoose.connection.close();
    console.log("🔌 Database connection closed.");
    process.exit(0);
  } catch (error) {
    console.error(`❌ Seeding Error: ${error.message}`);
    // Ensure the MongoDB connection is closed even on failures
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
      console.log("🔌 Database connection closed after error.");
    }
    process.exit(1);
  }
};

// Execute the seeder
seedData();
