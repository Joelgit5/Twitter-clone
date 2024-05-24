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

//* DataBase Connections
dbConnect();

// Middleware to parse JSON bodies with a limit to prevent DOS attacks
app.use(express.json({ limit: "5mb" }));

app.use(express.urlencoded({ extended: true })); //to parse from data(urlencoded)
app.use(cookieParser());

//* Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/postS", postRoutes);
app.use("/api/notifications", notificationRoutes);

//* PORT Assign
const PORT = process.env.PORT || 9000;

//* Running App
app.listen(PORT, () => console.log(`Server Runing on ${PORT}`));
