import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import dbConnect from "./src/utils/connectData.js";
import initialRouter from "./src/routes/index.routes.js";
import cors from "cors";

const app = express();
dotenv.config();
const port = process.env.PORT || 8888;

const corsOptions = {
  origin: "http://127.0.0.1:5500", // Thay đổi URL này nếu frontend của bạn ở địa chỉ khác
  methods: ["GET", "POST", "PUT", "DELETE"], // Các phương thức được phép
  credentials: true, // Cho phép gửi cookies
};

app.use(cors(corsOptions)); // Cấu hình CORS cho toàn bộ ứng dụng

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === "development") {
  dbConnect();
}
initialRouter(app);

export const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

export default app;
