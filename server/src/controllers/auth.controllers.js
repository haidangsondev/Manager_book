import {
  checkEmail,
  checkPasswordToken,
  checkUserRefreshAccessToken,
  registerUser,
  updateUser,
} from "../services/auth.services.js";
import asyncHandler from "express-async-handler";
import { sendEmail } from "../utils/sendEmail.js";
import uniqid from "uniqid";
import { checkPassword, hashPasswrod } from "../utils/password.js";
import { signAccessToken, signRefreshToken } from "../utils/jwt.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

export const register = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const Email = await checkEmail(email);
  if (Email) {
    throw new Error("Email đã tồn tại");
  }

  // Tạo registerToken để lưu vào cookie
  const registerToken = uniqid();
  res.cookie(
    "data_book_register",
    {
      ...req.body,
      registerToken,
    },
    // Hạn sử dụng của cookie là 15 phút
    { maxAge: 15 * 60 * 1000, httpOnly: true }
  );

  const html = `Đây là mã để bạn xác thực tài khoản email và hiệu lực là 15 phút. Mã<b>  ${registerToken}</b>`;
  const subject = "Xác thực tài khoản";
  const data = {
    email,
    subject,
    html,
  };

  // Gửi email để xác thực người dùng
  await sendEmail(data);

  return res.status(200).json({
    success: true,
    message: "Kiểm tra email để xác thực tài khoản đã đăng ký",
    registerToken,
  });
});

export const finalRegister = asyncHandler(async (req, res, next) => {
  const { register_token } = req.params;
  const cookie = JSON.parse(req.cookies?.data_book_register || "{}");

  // Kiểm tra mã xác thực của người dùng qua email đã đăng ký
  if (!cookie || cookie.registerToken !== register_token) {
    res.clearCookie("data_book_register");
    return res.status(500).json({
      success: false,
      message: "Hết thời gian cho việc xác thực tài khoản",
    });
  }

  // Truy xuất các tài liệu đã lưu trong cookie để tạo tài khoản cho người dùng
  const { username, email, password, registerToken } = cookie;
  const data = {
    username,
    email,
    password: await hashPasswrod(password),
    emailToken: registerToken,
    isVerify: true,
  };

  const response = await registerUser(data);

  // Xóa các thông tin đã lưu khi đã xác thực mã qua email lúc đăng ký
  res.clearCookie("data_book_register", {
    httpOnly: true,
    secure: true,
  });

  return res.status(200).json({
    success: true,
    message: "Xác thực tài khoản email thành công",
    user: response,
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Kiểm tra người dùng đã đăng ký/tồn tại qua hàm checkEmail
  // Kiểm tra mật khẩu có hợp lệ so với lúc đăng ký qua hàm checkPassword
  const User = await checkEmail(email);
  if (!(User && (await checkPassword(password, User.password)))) {
    throw new Error("Email hoặc Password không hợp lệ");
  }

  // Lấy các thông tin cần thiêt của người dùng sau khi kiểm tra thành công
  const {
    password: isPassword,
    refreshToken: refresh_token,
    passwordChangeAt,
    role,
    emailToken,
    ...userData
  } = User.toObject();

  const accessToken = signAccessToken(User._id, role);
  const refreshToken = signRefreshToken(User._id);

  await updateUser(User._id, { refreshToken });

  // Lưu thông tin refreshToken vào cookie để xác thực người dùng khi có các yêu cầu gửi đến
  // Hạn sử dùng trong cookie là 7 ngày
  res.cookie("refresh_book_token", refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
    message: "Đăng nhập thành công",
    accessToken,
    user: userData,
  });
});

export const logoutUser = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  const { _id } = req.user;

  // Xác thực thông tin người dùng khi có yêu cầu gửi đến
  if (!cookie || !cookie.refresh_book_token) {
    throw new Error("Không tìm thấy refresh token ");
  }

  await updateUser(_id, { refreshToken: "" });

  // Xóa refreshToken khỏi cookie sau khi đăng xuất
  res.clearCookie("refresh_book_token", {
    httpOnly: true,
    secure: true,
  });

  return res.status(200).json({
    success: true,
    message: "Đăng xuất thành công",
  });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const User = await checkEmail(email);
  if (!User) {
    throw new Error("Email không tồn tại");
  }
  const passwordResetToken = await User.createPasswordToken();
  await User.save();

  const html = `Đây là mã bạn cần để xác thực tài khoản email để thực hiện đổi mật khẩu và hiệu lực là 15 phút. Mã <b> ${passwordResetToken} </b>`;
  const subject = "Quên mật khẩu";
  const data = {
    email,
    html,
    subject,
  };
  // Gửi email để xác thực mã người dùng
  await sendEmail(data);
  return res.status(200).json({
    success: true,
    message: "Kiểm tra email để xác thực cho việc cho quá trình đổi mật khẩu",
    passwordResetToken,
  });
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { password, tokenPassword } = req.body;

  // Tạo mã băm dạng(token) cho cho mật khẩu
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(tokenPassword)
    .digest("hex");

  const User = await checkPasswordToken(passwordResetToken);

  if (!User) {
    return res.status(500).json({
      success: false,
      message: "Mã xác thực không tồn tại hoặc đã hết hạn",
    });
  }

  // Cập nhật thời gian xác thực token của mật khẩu
  User.password = await hashPasswrod(password);
  User.passwordResetToken = undefined;
  User.passwordResetExpires = undefined;
  User.passwordChangeAt = Date.now();
  await User.save();

  return res.status(200).json({
    success: true,
    message: "Đổi mật khẩu thành công",
  });
});

export const refreshAccessToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie || !cookie.refresh_book_token) {
    throw new Error("Không tìm thấy refresh token ");
  }

  // Xác thực người dùng
  jwt.verify(
    // refreshTonken của người dùng đã lưu vào cookie khi đăng nhập thành công
    cookie.refresh_token,
    process.env.JWT_SECRETKEY,
    async (err, decode) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: "Xác thực người dùng không thành công",
        });
      }
      const User = await checkUserRefreshAccessToken({
        _id: decode._id,
        refreshToken: cookie.refresh_book_token,
      });
      if (!User) {
        throw new Error("Người dùng không tồn tại");
      }

      const accessToken = signAccessToken(User._id);
      return res.status(200).json({
        success: true,
        accessToken,
        message: "Xác thực ngươì dùng thành công",
      });
    }
  );
});
