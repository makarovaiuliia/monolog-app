import type { Application } from "express";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./router/index";
import mongoose from "mongoose";

dotenv.config();

const app: Application = express();
const uri = process.env.MONGODB_URI as string;
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api", router);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await mongoose.connect(uri);

    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
