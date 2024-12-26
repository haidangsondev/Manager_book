import { connectTest, closeConnectTest } from "../../setTest";
import supertest from "supertest";
import app, { server } from "../../index";
import {
  addAuthor,
  getAllAuthor,
  updateIsAuthor,
  deleteIsAuthor,
} from "../../src/services/author.services.js";

jest.mock("../../src/services/author.services.js"); // Mock các service
beforeAll(async () => {
  await connectTest();
});

afterAll(async () => {
  await closeConnectTest();
  server.close();
});

describe("Author", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/author", () => {
    it("Trả về 201 nếu thêm tác giả thành công", async () => {
      const mockAuthor = {
        name: "Nguyen Van A",
        bio: "Tác giả nổi tiếng về thể loại sách giả tưởng.",
        nationality: "Vietnam",
      };

      // Mock `addAuthor` trả về dữ liệu tác giả
      addAuthor.mockResolvedValue(mockAuthor);

      const response = await supertest(app)
        .post("/api/author")
        .send(mockAuthor);

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Tác giả mới đã được thêm thành công");
      expect(response.body.data).toEqual(mockAuthor);
    });
    it("Trả về 500 nếu xảy ra lỗi khi thêm tác giả", async () => {
      const mockAuthor = {
        name: "Nguyen Van A",
        bio: "Tác giả nổi tiếng về thể loại sách giả tưởng.",
        nationality: "Vietnam",
      };

      // Mock `addAuthor` trả về null
      addAuthor.mockResolvedValue(null);

      const response = await supertest(app)
        .post("/api/author")
        .send(mockAuthor);

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Có xảy ra lỗi hệ thống khi thêm tác giả"
      );
    });
  });

  describe("GET /api/author", () => {
    it("Trả về 200 nếu tìm thấy danh sách tác giả", async () => {
      const mockAuthors = [
        { name: "Nguyen Van A", nationality: "Vietnam" },
        { name: "John Doe", nationality: "USA" },
      ];

      // Mock `getAllAuthor` trả về danh sách tác giả
      getAllAuthor.mockResolvedValue(mockAuthors);

      const response = await supertest(app)
        .get("/api/author")
        .query({ name: "Nguyen Van A" });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Danh sách tác giả");
      expect(response.body.data).toEqual(mockAuthors);
    });
    it("Trả về 404 nếu không tìm thấy tác giả", async () => {
      // Mock `getAllAuthor` trả về mảng rỗng
      getAllAuthor.mockResolvedValue([]);

      const response = await supertest(app)
        .get("/api/author")
        .query({ name: "Unknown Author" });

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Không tìm thấy tác giả");
    });
  });

  describe("PUT /api/author/:authorId", () => {
    it("Trả về 400 nếu không có dữ liệu cập nhật", async () => {
      const response = await supertest(app).put("/api/author/123").send({});

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Thông tin cập nhật là bắt buộc");
    });
    it("Trả về 500 nếu không tìm thấy tác giả để cập nhật", async () => {
      // Mock `updateIsAuthor` trả về null
      updateIsAuthor.mockResolvedValue(null);

      const response = await supertest(app)
        .put("/api/author/unknown-id")
        .send({ name: "Non-existent Author" });

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Có xảy ra lỗi hệ thống khi cập nhật thông tin"
      );
    });

    it("Trả về 200 nếu cập nhật tác giả thành công", async () => {
      const mockUpdatedAuthor = {
        id: "123",
        name: "Updated Author Name",
        nationality: "Vietnam",
      };

      // Mock `updateIsAuthor` trả về thông tin tác giả đã cập nhật
      updateIsAuthor.mockResolvedValue(mockUpdatedAuthor);

      const response = await supertest(app)
        .put("/api/author/123")
        .send({ name: "Updated Author Name", nationality: "Vietnam" });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe(
        "Thông tin tác giả đã được cập nhật thành công"
      );
      expect(response.body.data).toEqual(mockUpdatedAuthor);
    });
  });

  describe("DELETE /api/author/:authorId", () => {
    it("Trả về 404 nếu không tìm thấy tác giả để xóa", async () => {
      // Mock `deleteIsAuthor` trả về null
      deleteIsAuthor.mockResolvedValue(null);

      const response = await supertest(app).delete("/api/author/unknown-id");

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Không tìm thấy tác giả");
    });
    it("Trả về 200 nếu xóa tác giả thành công", async () => {
      const mockDeletedAuthor = {
        id: "123",
        name: "Author Name",
        nationality: "Vietnam",
      };

      // Mock `deleteIsAuthor` trả về thông tin tác giả đã xóa
      deleteIsAuthor.mockResolvedValue(mockDeletedAuthor);

      const response = await supertest(app).delete("/api/author/123");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Xóa tác giả thành công");
    });
  });
});
