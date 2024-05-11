import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db/ConnectMongoDB.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

//* DataBase Connections
dbConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//* Routes
app.use("/api/auth", authRoutes);

//* PORT Assign
const PORT = process.env.PORT || 9000;

//* Running App
app.listen(PORT, () => console.log(`Server Runing on ${PORT}`));
