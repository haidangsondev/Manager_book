import { connectTest, closeConnectTest } from "../../setTest";
import supertest from "supertest";
import app, { server } from "../../index";

import {
  createCategoryBook,
  updateCategoryBook,
  getCategoryBook,
  deleteCategoryBook,
} from "../../src/services/category.services.js";

jest.mock("../../src/services/category.services.js"); // Mock các service

beforeAll(async () => {
  await connectTest();
});

afterAll(async () => {
  await closeConnectTest();
  server.close();
});

describe("Category", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/category", () => {
    it("Trả về 201 nếu tạo thể loại sách thành công", async () => {
      const mockCategory = {
        id: "1",
        name: "Fiction",
        description: "Category for fictional books",
      };

      // Mock `createCategoryBook` trả về thông tin thể loại sách vừa tạo
      createCategoryBook.mockResolvedValue(mockCategory);

      const response = await supertest(app).post("/api/category").send({
        name: "Fiction",
        description: "Category for fictional books",
      });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe(
        "Thể loại sách đã được tạo thành công"
      );
      expect(response.body.data).toEqual(mockCategory);
    });

    it("Trả về 500 nếu tạo thể loại sách không thành công", async () => {
      // Mock `createCategoryBook` trả về null
      createCategoryBook.mockResolvedValue(null);

      const response = await supertest(app).post("/api/category").send({
        name: "Fiction",
        description: "Category for fictional books",
      });

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Có xảy ra lỗi hệ thống khi thêm thể loại sách"
      );
    });
  });

  describe("PUT /api/category/:categoryId", () => {
    it("Trả về 400 nếu không có dữ liệu cập nhật", async () => {
      const response = await supertest(app).put("/api/category/1").send({});

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Thông tin cập nhật là bắt buộc");
    });
    it("Trả về 500 nếu xảy ra lỗi hệ thống khi cập nhật thông tin", async () => {
      // Mock `updateCategoryBook` trả về null
      updateCategoryBook.mockResolvedValue(null);

      const response = await supertest(app)
        .put("/api/category/invalid-id")
        .send({
          name: "Nonexistent Category",
          description: "This category does not exist",
        });

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Có xảy ra lỗi hệ thống khi cập nhật thông tin"
      );
    });
    it("Trả về 200 nếu cập nhật thể loại sách thành công", async () => {
      const mockUpdatedCategory = {
        id: "1",
        name: "Updated Fiction",
        description: "Updated category for fictional books",
      };

      // Mock `updateCategoryBook` trả về thông tin thể loại sách sau khi cập nhật
      updateCategoryBook.mockResolvedValue(mockUpdatedCategory);

      const response = await supertest(app).put("/api/category/1").send({
        name: "Updated Fiction",
        description: "Updated category for fictional books",
      });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Cập nhật thể loại sách thành công");
      expect(response.body.data).toEqual(mockUpdatedCategory);
    });
  });

  describe("GET /api/category", () => {
    it("Trả về 404 nếu không có thể loại sách nào", async () => {
      // Mock `getCategoryBook` trả về mãng rỗng
      getCategoryBook.mockResolvedValue([]);

      const response = await supertest(app).get("/api/category");

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Không tìm thấy thể loại sách nào");
    });
    it("Trả về danh sách thể loại sách dựa trên query `name`", async () => {
      const mockFilteredCategories = [
        { id: "1", name: "Fiction", description: "Fictional books" },
      ];

      // Mock `getCategoryBook` trả về danh sách thể loại sách dựa trên `name`
      getCategoryBook.mockResolvedValue(mockFilteredCategories);

      const response = await supertest(app).get("/api/category").query({
        name: "Fiction",
      });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Danh sách thể loại sách");
      expect(response.body.data).toEqual(mockFilteredCategories);
    });
    it("Trả về 200 nếu danh sách thể loại sách được tìm thấy", async () => {
      const mockCategories = [
        { id: "1", name: "Fiction", description: "Fictional books" },
        { id: "2", name: "Non-Fiction", description: "Non-fictional books" },
      ];

      // Mock `getCategoryBook` trả về danh sách thể loại sách
      getCategoryBook.mockResolvedValue(mockCategories);

      const response = await supertest(app).get("/api/category");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Danh sách thể loại sách");
      expect(response.body.data).toEqual(mockCategories);
    });
  });

  describe("DELETE /api/category/:categoryId", () => {
    it("Trả về 404 nếu thể loại không tồn tại", async () => {
      // Mock `deleteCategoryBook` trả về null
      deleteCategoryBook.mockResolvedValue(null);

      const response = await supertest(app).delete("/api/category/invalid-id");

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Thể loại không tồn tại");
    });
    it("Trả về 200 nếu xóa thể loại thành công", async () => {
      const mockDeletedCategory = { id: "1", name: "Fiction" };

      // Mock `deleteCategoryBook` trả về thể loại đã xóa
      deleteCategoryBook.mockResolvedValue(mockDeletedCategory);

      const response = await supertest(app).delete("/api/category/1");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Thể loại đã được xóa thành công");
    });
  });
});
