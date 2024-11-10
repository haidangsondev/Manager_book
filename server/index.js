import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import dbConnect from "./src/utils/connectData.js";
import initialRouter from "./src/routes/index.routes.js";

const app = express();
dotenv.config();
const port = process.env.PORT || 8888;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

initialRouter(app);

dbConnect();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
