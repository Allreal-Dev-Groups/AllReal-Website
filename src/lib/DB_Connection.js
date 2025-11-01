import mongoose from "mongoose";

export const DB_Connection = async () => {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: "blog_app",
  });
};
