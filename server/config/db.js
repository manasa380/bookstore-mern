import mongoose from "mongoose";

let mongoMemoryServer;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return;
  } catch (error) {
    console.log("Database Connection Failed");
    console.log("process.env.NODE_ENV=", process.env.NODE_ENV);
    console.log("MONGO_URI present=", !!process.env.MONGO_URI);
    console.log("Error:", error.code, error.message);

    // In development, fall back to an in-memory MongoDB so the app can run
    if (process.env.NODE_ENV === "development") {
      try {
        // Lazy import to avoid adding dependency in production
        const { MongoMemoryServer } = await import("mongodb-memory-server");
        mongoMemoryServer = await MongoMemoryServer.create();
        const uri = mongoMemoryServer.getUri();

        const conn = await mongoose.connect(uri);
        console.log("Connected to in-memory MongoDB for development");
        return;
      } catch (memErr) {
        console.log("Failed to start in-memory MongoDB:", memErr.message);
      }
    }

    process.exit(1);
  }
};

export default connectDB;