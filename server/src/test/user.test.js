import { connectTest, closeConnectTest } from "../../setTest";
import supertest from "supertest";
import app, { server } from "../../index";

import {
  getProfile,
  updateProfile,
  checkUsernameUser,
  addUser,
  getAllUser,
  removeUser,
} from "../../src/services/user.services.js";
import { checkPassword, hashPasswrod } from "../../src/utils/password.js";

jest.mock("../../src/services/user.services.js"); // Mock các service
jest.mock("../../src/utils/password.js"); // Mock các service

beforeAll(async () => {
  await connectTest();
});

afterAll(async () => {
  await closeConnectTest();
  server.close();
}, 5000);

describe("User", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("GET /api/user/profile", () => {
    it("Trả về 404 nếu không tìm thấy người dùng", async () => {
      // Mock `getProfile` trả về null (không tìm thấy người dùng)
      getProfile.mockResolvedValue(null);

      const response = await supertest(app).get("/api/user/profile");

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Không tìm thấy người dùng");
    });
    it("Trả về 200 nếu tìm thấy người dùng", async () => {
      const mockUser = {
        _id: "675cf5e5ee774cbbc8f9e57f",
        passwordResetExpires: "",
        username: "Hai Dang Son",
        email: "haidangson.dev@gmail.com",
        membership_status: "hoạt động",
        isVerify: true,
        avatar: "",
        passwordChangeAt: "1735119581585",
        role: "user",
        borrowedBooks: [],
        reservedBooks: [],
        history: [],
        createdAt: "2024-12-14T03:05:09.921Z",
        updatedAt: "2024-12-25T09:40:33.917Z",
      };
      // Mock `getProfile` trả về đối tượng người dùng hợp lệ
      getProfile.mockResolvedValue(mockUser);

      const response = await supertest(app).get("/api/user/profile");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Lấy người dùng thành công");
      expect(response.body.data).toEqual(mockUser);
    });
  });
  describe("PUT /api/user/profile", () => {
    it("Trả về 400 nếu không gửi dữ liệu để cập nhật", async () => {
      const response = await supertest(app).put("/api/user/profile").send({}); // Không gửi dữ liệu cập nhật

      expect(response.status).toBe(400); // Có thể điều chỉnh nếu cần
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Thông tin cập nhật là bắt buộc");
    });
    it("Trả về 500 nếu hệ thống xảy ra lỗi", async () => {
      // Mock `updateProfile` trả về null (cập nhật không thành công)
      updateProfile.mockResolvedValue(null);

      const response = await supertest(app)
        .put("/api/user/profile")
        .send({ name: "Nguyễn Văn A", email: "test@example.com" });

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Có lỗi hệ thống xảy ra khi cập nhật thông tin"
      );
      expect(response.body.data).toBe("");
    });
    it("Trả về 200 nếu cập nhật thông tin người dùng thành công", async () => {
      const mockUpdatedUser = { _id: "1", username: "Nguyễn Văn A" };
      // Mock `updateProfile` trả về thông tin người dùng đã được cập nhật
      updateProfile.mockResolvedValue(mockUpdatedUser);

      const response = await supertest(app)
        .put("/api/user/profile")
        .send({ username: "Nguyễn Văn A", email: "test@example.com" });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Cập nhật thông tin thành công");
      expect(response.body.data).toEqual(mockUpdatedUser);
    });
  });

  describe("PUT /api/user/change-password", () => {
    it("Trả về 404 nếu người dùng không tồn tại", async () => {
      // Mock `getProfile` trả về null (người dùng không tồn tại)
      getProfile.mockResolvedValue(null);

      const response = await supertest(app)
        .put("/api/user/change-password")
        .send({
          currentPassword: "oldPassword123",
          newPassword: "newPassword123",
          confirmPassword: "newPassword123",
        });

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Người dùng không tồn tại");
    });
    it("Trả về 401 nếu mật khẩu hiện tại không đúng", async () => {
      const mockUser = { _id: "1", password: "hashedOldPassword" };

      // Mock `getProfile` trả về người dùng hợp lệ
      getProfile.mockResolvedValue(mockUser);
      // Mock `checkPassword` trả về false (mật khẩu không đúng)
      checkPassword.mockResolvedValue(false);

      const response = await supertest(app)
        .put("/api/user/change-password")
        .send({
          currentPassword: "wrongPassword123",
          newPassword: "newPassword123",
          confirmPassword: "newPassword123",
        });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Mật khẩu hiện tại không đúng");
    });

    it("Trả về 200 nếu mật khẩu thay đổi thành công", async () => {
      const mockUser = { _id: "1", password: "hashedOldPassword" };

      getProfile.mockResolvedValue(mockUser);
      checkPassword.mockResolvedValue(true);
      hashPasswrod.mockResolvedValue("hashedNewPassword");
      mockUser.save = jest.fn().mockResolvedValue(mockUser);

      const response = await supertest(app)
        .put("/api/user/change-password")
        .send({
          currentPassword: "oldPassword123",
          newPassword: "newPassword123",
          confirmPassword: "newPassword123",
        });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Đổi mật khẩu thành công");
    });
  });

  describe("POST /api/user", () => {
    it("Trả về 409 nếu tên người dùng đã tồn tại", async () => {
      // Mock `checkUsernameUser` trả về true (tên người dùng đã tồn tại)
      checkUsernameUser.mockResolvedValue(true);

      const response = await supertest(app).post("/api/user").send({
        username: "testUser",
        password: "password123",
        confirmPassword: "password123",
      });

      expect(response.status).toBe(409);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Tên người dùng đã tồn tại");
    });
    it("Trả về 201 nếu tạo người dùng thành công", async () => {
      const mockUser = { id: "1", username: "testUser" };

      // Mock `checkUsernameUser` trả về false (tên người dùng chưa tồn tại)
      checkUsernameUser.mockResolvedValue(false);
      // Mock `addUser` trả về thông tin người dùng mới
      addUser.mockResolvedValue(mockUser);

      const response = await supertest(app).post("/api/user").send({
        username: "testUser",
        password: "password123",
        confirmPassword: "password123",
      });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Tạo người dùng thành công");
      expect(response.body.user).toEqual(mockUser);
    });
  });

  describe("GET /api/user", () => {
    it("Trả về 404 nếu không tìm thấy người dùng", async () => {
      // Mock `getAllUser` trả về null hoặc mảng rỗng
      getAllUser.mockResolvedValue([]);

      const response = await supertest(app)
        .get("/api/user")
        .query({ username: "nonexistentuser" });

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Không tìm thấy người dùng");
    });

    it("Trả về 200 và danh sách người dùng nếu tìm thấy", async () => {
      const mockUsers = [
        { id: "1", username: "user1", role: "user" },
        { id: "2", username: "user2", role: "user" },
      ];

      // Mock `getAllUser` trả về danh sách người dùng
      getAllUser.mockResolvedValue(mockUsers);

      const response = await supertest(app)
        .get("/api/user")
        .query({ role: "user" });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Danh sách người dùng");
      expect(response.body.data).toEqual(mockUsers);
    });
    it("Tên trả về 200 và danh sách người dùng theo username", async () => {
      const mockUser = [{ id: "1", username: "specificUser", role: "user" }];

      // Mock `getAllUser` trả về danh sách người dùng phù hợp
      getAllUser.mockResolvedValue(mockUser);

      const response = await supertest(app)
        .get("/api/user")
        .query({ username: "specificUser" });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Danh sách người dùng");
      expect(response.body.data).toEqual(mockUser);
    });
  });

  describe("PUT /api/user/:userId", () => {
    it("Trả về 400 nếu không có dữ liệu cập nhật", async () => {
      const response = await supertest(app)
        .put("/api/user/1") // Gửi yêu cầu PUT với userId
        .send({}); // Không gửi dữ liệu

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Thông tin cập nhật là bắt buộc");
    });
    it("Trả về 500 nếu có lỗi hệ thống khi cập nhật", async () => {
      // Mock `updateUserInfo` trả về null (cập nhật thất bại)
      updateProfile.mockResolvedValue(null);

      const response = await supertest(app)
        .put("/api/user/1") // Gửi yêu cầu PUT với userId
        .send({ username: "Nguyễn Văn A" });

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Có xảy ra lỗi hệ thống khi cập nhật thông tin"
      );
    });
    it("Trả về 200 nếu cập nhật thông tin người dùng thành công", async () => {
      const mockUpdatedUser = {
        id: "1",
        username: "Nguyễn Văn A",
        avatar: "path/to/avatar.jpg",
      };

      // Mock `updateUserInfo` trả về thông tin người dùng đã cập nhật
      updateProfile.mockResolvedValue(mockUpdatedUser);

      const response = await supertest(app)
        .put("/api/user/1") // Gửi yêu cầu PUT với userId
        .send({ username: "Nguyễn Văn A" });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe(
        "Cập nhật thông tin người dùng thành công"
      );
      expect(response.body.data).toEqual(mockUpdatedUser);
    });
  });

  describe("DELETE /api/user/:userId", () => {
    it("Trả về 404 nếu người dùng không tồn tại", async () => {
      // Mock `removeUser` trả về null (người dùng không tồn tại)
      removeUser.mockResolvedValue(null);

      const response = await supertest(app).delete("/api/user/999"); // Gửi yêu cầu DELETE với userId không tồn tại

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Người dùng không tồn tại");
    });
    it("Trả về 200 nếu người dùng được xóa thành công", async () => {
      const mockDeletedUser = { id: "1", username: "Nguyễn Văn A" };

      // Mock `removeUser` trả về thông tin người dùng đã xóa
      removeUser.mockResolvedValue(mockDeletedUser);

      const response = await supertest(app).delete("/api/user/1"); // Gửi yêu cầu DELETE với userId

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Đã xóa người dùng thành công");
    });
  });

  describe("GET /api/user/admin", () => {
    it("Trả về 404 nếu không tìm thấy người dùng", async () => {
      // Mock `getAllUser` trả về `null` hoặc danh sách rỗng
      getAllUser.mockResolvedValue([]);

      const response = await supertest(app)
        .get("/api/user/admin")
        .query({ username: "nonexistent" }); // Gửi yêu cầu với username không tồn tại

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Không tìm thấy người dùng.");
    });

    it("Trả về 200 và danh sách người dùng theo từ khóa tìm kiếm", async () => {
      const mockUsers = [
        {
          id: "1",
          username: "user1",
          email: "user1@example.com",
          role: "user",
        },
        {
          id: "2",
          username: "admin1",
          email: "admin1@example.com",
          role: "admin",
        },
      ];

      // Mock `getAllUser` trả về toàn bộ người dùng
      getAllUser.mockResolvedValue(mockUsers);

      const response = await supertest(app)
        .get("/api/user/admin")
        .query({ role: "user" });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Danh sách người dùng.");
      expect(response.body.data).toEqual(mockUsers);
    });

    it("Trả về 200 nếu tìm thấy danh sách người dùng", async () => {
      const mockUsers = [
        {
          id: "1",
          username: "user1",
          email: "user1@example.com",
          role: "user",
        },
        {
          id: "2",
          username: "admin1",
          email: "admin1@example.com",
          role: "admin",
        },
      ];

      // Mock `getAllUser` trả về danh sách người dùng
      getAllUser.mockResolvedValue(mockUsers);

      const response = await supertest(app).get("/api/user/admin");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Danh sách người dùng.");
      expect(response.body.data).toEqual(mockUsers);
    });
  });

  describe("GET /api/user/admin/:userId", () => {
    it("Trả về 404 nếu không tìm thấy người dùng", async () => {
      // Mock `getProfile` trả về null
      getProfile.mockResolvedValue(null);

      const response = await supertest(app).get("/api/user/admin/999"); // Gửi yêu cầu với userId không tồn tại

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Không tìm thấy người dùng");
    });
    it("Trả về 200 nếu người dùng tồn tại", async () => {
      const mockUser = {
        id: "1",
        username: "user1",
        email: "user1@example.com",
        role: "user",
      };

      // Mock `getProfile` trả về thông tin người dùng
      getProfile.mockResolvedValue(mockUser);

      const response = await supertest(app).get("/api/user/admin/1"); // Gửi yêu cầu với userId hợp lệ

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Chi tiết người dùng.");
      expect(response.body.data).toEqual(mockUser);
    });
  });

  describe("PUT /api/user/admin/:userId", () => {
    it("Trả về 400 nếu không gửi dữ liệu cập nhật", async () => {
      const response = await supertest(app).put("/api/user/admin/1").send({}); // Không có dữ liệu cập nhật

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Thông tin cập nhật là bắt buộc");
    });

    it("Trả về 500 nếu cập nhật thông tin thất bại", async () => {
      // Mock `updateProfile` trả về null
      updateProfile.mockResolvedValue(null);

      const response = await supertest(app)
        .put("/api/user/admin/1")
        .send({ username: "user1", email: "user1@example.com" }); // Dữ liệu cập nhật

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Có xảy ra lỗi hệ thống khi cập nhật thông tin"
      );
    });

    it("Trả về 200 nếu thông tin người dùng được cập nhật thành công", async () => {
      const mockUpdatedUser = {
        id: "1",
        username: "user1",
        email: "user1@example.com",
      };

      // Mock `updateProfile` trả về thông tin người dùng đã được cập nhật
      updateProfile.mockResolvedValue(mockUpdatedUser);

      const response = await supertest(app)
        .put("/api/user/admin/1")
        .send({ username: "user1", email: "user1@example.com" }); // Dữ liệu cập nhật

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe(
        "Cập nhật thông tin người dùng thành công"
      );
      expect(response.body.data).toEqual(mockUpdatedUser);
    });
  });

  describe("DELETE /api/user/admin/:userId", () => {
    it("Trả về 404 nếu người dùng không tồn tại", async () => {
      // Mock `removeUser` trả về null (người dùng không tồn tại)
      removeUser.mockResolvedValue(null);

      const response = await supertest(app).delete("/api/user/admin/999"); // Gửi yêu cầu DELETE với userId không tồn tại

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Người dùng không tồn tại");
    });
    it("Trả về 200 nếu xóa người dùng thành công", async () => {
      const mockDeletedUser = {
        id: "1",
        username: "user1",
        email: "user1@example.com",
      };

      // Mock `removeUser` trả về thông tin người dùng đã xóa
      removeUser.mockResolvedValue(mockDeletedUser);

      const response = await supertest(app).delete("/api/user/admin/1"); // Gửi yêu cầu DELETE với userId hợp lệ

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Đã xóa người dùng thành công");
    });
  });
});
