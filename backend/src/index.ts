import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import app from "./app";

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://srd118050_db_user:iaQ7EtiGHjNa3zdF@chatapp.kqiznba.mongodb.net/PushTask?retryWrites=true&w=majority";

async function startServer() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅  MongoDB connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀  Server running at http://localhost:${PORT}`);
      console.log(`📄  API docs: http://localhost:${PORT}/posts`);
    });
  } catch (error) {
    console.error("❌  Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

mongoose.connection.on("disconnected", () => {
  console.warn("⚠️  MongoDB disconnected");
});

startServer();
