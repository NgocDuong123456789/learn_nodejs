import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routerApp from "./Router/index";

dotenv.config();
const PORT = process.env.PORT || 5000;
async function main() {

  try {
    await mongoose.connect("mongodb://localhost:27017/test");
    console.log("connect database successfully");
  } catch (err) {
    console.log("connect database error");
  }
}

main();
const app = express();
app.use(cors({ credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());
app.use(express.json());
routerApp(app);

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
});
