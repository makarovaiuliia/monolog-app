import dotenv from "dotenv";
dotenv.config();

import type { Application } from "express";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./router/index";
import mongoose from "mongoose";
import errorMiddleware from "./middlewares/error-middleware";

const app: Application = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/api", router);
app.use(errorMiddleware);

const uri = process.env.MONGODB_URI as string;
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
