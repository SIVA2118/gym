import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import memberRoutes from "./routes/member.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/members", memberRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/gymdb")
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
  })
  .catch(err => console.error(err));
