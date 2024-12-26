import { connectTest, closeConnectTest } from "../../setTest";
import supertest from "supertest";
import app, { server } from "../../index";

import {
  addPublisher,
  updateIsPublisher,
  getAllPublisher,
  deleteIsPublisher,
} from "../../src/services/publisher.services.js";

jest.mock("../../src/services/publisher.services.js"); // Mock các service

beforeAll(async () => {
  await connectTest();
});

afterAll(async () => {
  await closeConnectTest();
  server.close();
}, 10000);

describe("Publisher", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/publisher", () => {
    it("Trả về 500 nếu xảy ra lỗi hệ thống", async () => {
      // Mock `addPublisher` trả về `null` (lỗi trong quá trình thêm)
      addPublisher.mockResolvedValue(null);

      const response = await supertest(app)
        .post("/api/publisher")
        .send({ name: "NXB Trẻ", address: "Hồ Chí Minh" });

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Có xảy ra lỗi hệ thống khi thêm NXB");
    });
    it("Trả về 201 nếu thêm NXB thành công", async () => {
      const mockPublisher = {
        id: "1",
        name: "NXB Trẻ",
        address: "Hồ Chí Minh",
      };

      // Mock `addPublisher` trả về thông tin NXB vừa thêm
      addPublisher.mockResolvedValue(mockPublisher);

      const response = await supertest(app)
        .post("/api/publisher")
        .send({ name: "NXB Trẻ", address: "Hồ Chí Minh" });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("NXB đã được thêm thành công");
      expect(response.body.data).toEqual(mockPublisher);
    });
  });

  describe("PUT /api/publisher/:publisherId", () => {
    it("Trả về 400 nếu không có dữ liệu để cập nhật", async () => {
      const response = await supertest(app).put("/api/publisher/1").send({});

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Thông tin cập nhật là bắt buộc");
    });
    it("Trả về 404 nếu không tìm thấy NXB để cập nhật", async () => {
      // Mock `updateIsPublisher` trả về `null` (không tìm thấy NXB)
      updateIsPublisher.mockResolvedValue(null);

      const response = await supertest(app)
        .put("/api/publisher/1")
        .send({ name: "NXB Trẻ", address: "Hà Nội" });

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Có xảy ra lỗi hệ thống khi cập nhật thông tin"
      );
    });
    it("Trả về 200 nếu cập nhật NXB thành công", async () => {
      const mockUpdatedPublisher = {
        id: "1",
        name: "NXB Trẻ",
        location: "Hà Nội",
      };

      // Mock `updateIsPublisher` trả về thông tin NXB đã cập nhật
      updateIsPublisher.mockResolvedValue(mockUpdatedPublisher);

      const response = await supertest(app)
        .put("/api/publisher/1")
        .send({ name: "NXB Trẻ", address: "Hà Nội" });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe(
        "Thông tin NXB đã được cập nhật thành công"
      );
      expect(response.body.data).toEqual(mockUpdatedPublisher);
    });
  });

  describe("GET /api/publisher", () => {
    it("Trả về 404 nếu không tìm thấy NXB", async () => {
      // Mock `getAllPublisher` trả về `null` hoặc danh sách rỗng
      getAllPublisher.mockResolvedValue([]);

      const response = await supertest(app).get("/api/publisher");

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Không tìm thấy NXB");
    });
    it("Trả về 200 nếu tìm thấy danh sách NXB", async () => {
      const mockPublishers = [
        { id: "1", name: "NXB Trẻ", location: "Hà Nội" },
        { id: "2", name: "NXB Kim Đồng", location: "TP. HCM" },
      ];

      // Mock `getAllPublisher` trả về danh sách NXB
      getAllPublisher.mockResolvedValue(mockPublishers);

      const response = await supertest(app).get("/api/publisher");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Danh sách NXB");
      expect(response.body.data).toEqual(mockPublishers);
    });
    it("Trả về 200 nếu danh sách NXB theo name", async () => {
      const mockFilteredPublishers = [
        { id: "1", name: "NXB Trẻ", address: "Hà Nội" },
      ];

      // Mock `getAllPublisher` trả về danh sách lọc theo `name`
      getAllPublisher.mockResolvedValue(mockFilteredPublishers);

      const response = await supertest(app)
        .get("/api/publisher")
        .query({ name: "NXB Trẻ" });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Danh sách NXB");
      expect(response.body.data).toEqual(mockFilteredPublishers);
    });
  });

  describe("DELETE /api/category/publisherId", () => {
    it("Trả về 404 nếu không tìm thấy publisher", async () => {
      // Mock `deleteIsPublisher` trả về null (không tìm thấy publisher)
      deleteIsPublisher.mockResolvedValue(null);

      const response = await supertest(app).delete("/api/publisher/999"); // Gửi yêu cầu DELETE với publisherId không tồn tại

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Không tìm thấy NXB");
    });
    it("Nên trả về 200 nếu publisher được xóa thành công", async () => {
      const mockPublisher = { id: "1", name: "NXB Trẻ" };
      // Mock `deleteIsPublisher` trả về đối tượng publisher hợp lệ
      deleteIsPublisher.mockResolvedValue(mockPublisher);

      const response = await supertest(app).delete("/api/publisher/1"); // Gửi yêu cầu DELETE với publisherId

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Xóa NXB thành công");
    });
  });
});
