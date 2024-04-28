import express from "express";
import dotenv from "dotenv";
import dbConnect from "./db/ConnectMongoDB.js";

const app = express();
dotenv.config();

//* DataBase Connections
dbConnect();

//* PORT Assign
const PORT = process.env.PORT || 9000;

//* Running App
app.listen(PORT, () => console.log(`Server Runing on ${PORT}`));
