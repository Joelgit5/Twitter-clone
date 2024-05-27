import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import dbConnect from "./db/ConnectMongoDB.js";
import { v2 as cloudinary } from "cloudinary";

import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";
// Imports End

const app = express();
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware to parse JSON bodies with a limit to prevent DOS attacks
app.use(express.json({ limit: "5mb" }));

app.use(express.urlencoded({ extended: true })); //to parse from data(urlencoded)
app.use(cookieParser());

const __dirname = path.resolve();

//* Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

//* PORT Assign
const PORT = process.env.PORT || 9000;

//* Running App
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  dbConnect();
});
