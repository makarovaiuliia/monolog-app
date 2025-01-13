import type { Application } from "express";
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
// const cookieParser = require("cookieParser");
const router = require("./router/index");

dotenv.config();

const app: Application = express();
const uri = process.env.MONGODB_URI as string;
app.use(express.json());
app.use(cors());
// app.use(cookieParser());
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
