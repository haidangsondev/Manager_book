import { connectTest, closeConnectTest } from "../../../setTest";
import supertest from "supertest";
import app, { server } from "../../../index";
import {
  checkEmail,
  registerUser,
  updateUser,} from '../../src/services/auth.services'
import { sendEmail } from "../../utils/sendEmail";
import { hashPasswrod, checkPassword } from "../../utils/password";
import { signAccessToken, signRefreshToken } from "../../utils/jwt.js";

jest.mock("../../services/auth.services.js"); // Mock các service
jest.mock("../../utils/sendEmail.js"); // Mock các
jest.mock("../../utils/password.js");
jest.mock("../../utils/jwt.js");

beforeAll(async () => {
  await connectTest();
});

afterAll(async () => {
  await closeConnectTest();
  server.close();
});

describe("Auth", () => {
  describe("Register", () => {
    it("Lỗi 500 nếu email đã tồn tại", async () => {
      checkEmail.mockResolvedValue(true);

      const response = await supertest(app)
        .post("/api/auth/register", (req, res, next) => {
          next();
        })
        .send({
          username: "newuser",
          email: "test@example.com",
          password: "!Dang12092001",
          confirmPassword: "!Dang12092001",
        });

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Email đã tồn tại");
    });

    it("Trả về  200 và gửi email nếu email hợp lệ", async () => {
      // Mock hàm checkEmail trả về false và sendEmail thành công
      checkEmail.mockResolvedValue(false);
      sendEmail.mockResolvedValue(true);

      const response = await supertest(app)
        .post("/api/auth/register", (req, res, next) => {
          next();
        })
        .send({
          username: "newuser",
          email: "test@example.com",
          password: "!Dang12092001",
          confirmPassword: "!Dang12092001",
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe(
        "Kiểm tra email để xác thực tài khoản đã đăng ký"
      );
    });
  });

  describe("Final Register", () => {
    const validCookie = {
      username: "newuser",
      email: "test@example.com",
      password: "!Dang12092001",
      registerToken: "validtoken",
    };

    it("Trả về 500 nếu cookie không hợp lệ hoặc token không trùng khớp", async () => {
      const response = await supertest(app)
        .get("/api/auth/final-register/fake-token")
        .set("Cookie", [`data_book_register=${JSON.stringify(validCookie)}`]);

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Hết thời gian cho việc xác thực tài khoản"
      );
    });

    it("Trả về 200 và tạo người dùng nếu thông tin cookie và token hợp lệ", async () => {
      // Mock các giá trị trả về cho các hàm trước khi gửi request
      hashPasswrod.mockResolvedValue("hashedpassword");
      registerUser.mockResolvedValue({
        username: "newuser",
        email: "test@example.com",
        password: "hashedpassword",
        emailToken: "validtoken",
        isVerify: true,
      });

      // Gửi request với token hợp lệ và cookie hợp lệ
      const response = await supertest(app)
        .get("/api/auth/final-register/validtoken")
        .set("Cookie", [`data_book_register=${JSON.stringify(validCookie)}`]);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Xác thực tài khoản email thành công");
      expect(response.body.user).toEqual({
        username: "newuser",
        email: "test@example.com",
        password: "hashedpassword",
        emailToken: "validtoken",
        isVerify: true,
      });
    });
  });

  describe("Login User", () => {
    const mockUser = {
      _id: "user123",
      email: "test@example.com",
      password: "hashedPassword",
      role: "user",
      refreshToken: null,
      toObject: jest.fn(function () {
        const { password, refreshToken, ...rest } = this;
        return rest;
      }),
    };

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it("Trả về lỗi khi email không tồn tại", async () => {
      checkEmail.mockResolvedValue(null);

      const response = await supertest(app).post("/api/auth/login").send({
        email: "invalid@example.com",
        password: "password123",
      });

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Email hoặc Password không hợp lệ");
    });

    it("Trả về lỗi khi mật khẩu không hợp lệ", async () => {
      checkEmail.mockResolvedValue(mockUser);
      checkPassword.mockResolvedValue(false);

      const response = await supertest(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "wrongPassword",
      });

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Email hoặc Password không hợp lệ");
    });

    it("Trả về thành công khi thông tin đăng nhập hợp lệ", async () => {
      checkEmail.mockResolvedValue(mockUser);
      checkPassword.mockResolvedValue(true);
      signAccessToken.mockReturnValue("fakeAccessToken");
      signRefreshToken.mockReturnValue("fakeRefreshToken");
      updateUser.mockResolvedValue(true);

      const response = await supertest(app).post("/api/auth/login").send({
        email: "test@example.com",
        password: "password123",
      });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Đăng nhập thành công");
      expect(response.body.accessToken).toBe("fakeAccessToken");
      expect(response.body.user).toEqual({
        _id: mockUser._id,
        email: mockUser.email,
      });
    });
  });
});
