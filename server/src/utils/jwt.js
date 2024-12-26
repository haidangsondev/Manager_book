import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

export const signAccessToken = (user_id, role) =>
  jwt.sign({ _id: user_id, role }, process.env.JWT_SECRETKEY, {
    expiresIn: "7d",
  });

export const signRefreshToken = (user_id) =>
  jwt.sign({ _id: user_id }, process.env.JWT_SECRETKEY, {
    expiresIn: "7d",
  });

export const verifyAccessToken = asyncHandler(async (req, res, next) => {
  if (process.env.NODE_ENV === "test") {
    req.user = { id: "testUserId", role: "user" }; // Bỏ qua xác thực trong test
    return next();
  }
  if (!req?.headers?.authorization?.startsWith("Bearer")) {
    return res.status(401).json({
      success: false,
      message: "Không tìm thấy access token",
    });
  }
  const token = req.headers.authorization.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRETKEY, (err, decode) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Xác thực access token không thành công",
      });
    }
    req.user = decode;
    next();
  });
});

export const verifyIsAdmin = asyncHandler(async (req, res, next) => {
  const { role } = req.user;
  if (process.env.NODE_ENV === "test") {
    // req.user = { id: "testUserId", role: "user" }; // Bỏ qua xác thực trong test
    return next();
  }
  if (role !== "admin") {
    return res.status(401).json({
      success: false,
      message: "Quyền truy cập là admin ",
    });
  }
  return next();
});

export const verifyIsLibrarian = asyncHandler(async (req, res, next) => {
  const { role } = req.user;
  if (process.env.NODE_ENV === "test") {
    // req.user = { id: "testUserId", role: "librarian" }; // Bỏ qua xác thực trong test
    return next();
  }
  if (role !== "librarian" && role !== "admin") {
    return res.status(401).json({
      success: false,
      message: "Quyền truy cập là thủ thư",
    });
  }
  next();
});
