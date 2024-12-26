import { connectTest, closeConnectTest } from "../../setTest";
import supertest from "supertest";
import app, { server } from "../../index";
import {
  createReservation,
  getUserReservations,
  getUserReservationById,
  cancelReservation,
  getAllReservation,
  updateReservationByStatus,
  deleteReservationById,
} from "../../src/services/reservation.services.js";
import { getBook } from "../../src/services/book.services.js";
import {
  addReversationBook,
  removeReversationBook,
} from "../../src/services/user.services.js";

jest.mock("../../src/services/user.services.js"); // Mock các service
jest.mock("../../src/services/reservation.services.js"); // Mock các service
jest.mock("../../src/services/book.services.js"); // Mock các service

beforeAll(async () => {
  await connectTest();
});

afterAll(async () => {
  await closeConnectTest();
  server.close();
});

describe("Reservation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Reserver book", () => {
    it("Trả về 400 nếu sách không khả dụng", async () => {
      getBook.mockResolvedValue({ available_copies: 0 });

      const response = await supertest(app)
        .post("/api/reservation")
        .send({ book_id: "book1" });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Sách không khả dụng.");
    });
    it("Trả về 500 nếu xảy ra lỗi trong quá trình đặt sách", async () => {
      const mockBook = {
        _id: "book1",
        available_copies: 5,
        reserved_copies: 0,
        save: jest.fn(),
      };

      getBook.mockResolvedValue(mockBook);
      createReservation.mockResolvedValue(null); // Giả lập lỗi khi tạo đặt sách

      const response = await supertest(app)
        .post("/api/reservation")
        .send({ book_id: "book1" });

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Đặt sách không thành công.");
    });
    it("Trả về 200 nếu đặt sách thành công", async () => {
      const mockBook = {
        id: "book1",
        available_copies: 5,
        reserved_copies: 0,
        save: jest.fn(),
      };

      const mockReservation = {
        id: "reserve1",
        user_id: "user1",
        book_id: "book1",
        expiry_date: new Date().toISOString(),
      };

      getBook.mockResolvedValue(mockBook);
      createReservation.mockResolvedValue(mockReservation);
      addReversationBook.mockResolvedValue(true);

      const response = await supertest(app)
        .post("/api/reservation")
        .send({ book_id: "book1" });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Đặt sách trước thành công.");
      expect(response.body.reservation).toEqual(mockReservation);
    });
  });

  describe("Get reservations", () => {
    it("Trả về 404 nếu không tìm thấy danh sách đặt trước", async () => {
      getUserReservations.mockResolvedValue(null);

      const response = await supertest(app).get("/api/reservation");

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Không tìm thấy danh sách đặt trước.");
    });
    it("Trả về 200 và danh sách đặt trước nếu tồn tại", async () => {
      const mockReservations = [
        { book_id: "book1", expiry_date: new Date().toISOString() },
        { book_id: "book2", expiry_date: new Date().toISOString() },
      ];

      getUserReservations.mockResolvedValue(mockReservations);

      const response = await supertest(app).get("/api/reservation");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Danh sách sách đã đặt trước.");
      expect(response.body.reservations).toEqual(mockReservations);
    });
  });

  describe("Cancel reserver book", () => {
    it("Trả về 404 nếu yêu cầu đặt trước không tồn tại", async () => {
      getUserReservationById.mockResolvedValue(null);

      const response = await supertest(app).patch(
        "/api/reservation/cancel/reservation1"
      );

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Không tìm thấy yêu cầu đặt trước.");
    });
    it("Trả về 400 nếu yêu cầu đã vượt hạn 3 ngày", async () => {
      const mockReservation = {
        _id: "reservation1",
        book_id: "book1",
        expiry_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // Hết hạn 1 ngày
      };

      getUserReservationById.mockResolvedValue(mockReservation);

      const response = await supertest(app).patch(
        "/api/reservation/cancel/reservation1"
      );

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Không thể hủy vì yêu cầu đã vượt hạn 3 ngày."
      );
    });

    it("Trả về 200 nếu hủy đặt trước thành công", async () => {
      const mockReservation = {
        _id: "reservation1",
        book_id: "book1",
        expiry_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Còn 2 ngày
      };
      const mockBook = {
        reserved_copies: 1,
        available_copies: 3,
        save: jest.fn(),
      };

      getUserReservationById.mockResolvedValue(mockReservation);
      getBook.mockResolvedValue(mockBook);
      removeReversationBook.mockResolvedValue(true);
      cancelReservation.mockResolvedValue(true);

      const response = await supertest(app).patch(
        "/api/reservation/cancel/reservation1"
      );

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Hủy yêu cầu đặt trước thành công.");
      expect(mockBook.save).toHaveBeenCalled();
    });
  });

  //   describe("Get reservations by librarian", () => {

  //     it("Trả về 404 nếu không có yêu cầu đặt trước", async () => {
  //       // Giả sử getAllReservation trả về mảng rỗng
  //       getAllReservation.mockResolvedValue(false);

  //       const response = await supertest(app).get("/api/reservation");
  //       console.log(response);
  //       expect(response.status).toBe(404); // Kiểm tra trả về 404 khi không có dữ liệu
  //       expect(response.body.success).toBe(false);
  //       expect(response.body.message).toBe("Yêu cầu đặt trước không tìm thấy");
  //     });
  //   });

  describe("Get reservation by librarian", () => {
    it("Trả về 404 nếu không tìm thấy yêu cầu đặt trước", async () => {
      // Mock không tìm thấy yêu cầu đặt trước
      getUserReservationById.mockResolvedValue(null);

      const response = await supertest(app).get("/api/reservation/1");

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Yêu cầu đặt trước không tìm thấy");
    });

    it("Trả về 200 và chi tiết yêu cầu đặt trước nếu tìm thấy", async () => {
      const mockReservation = {
        id: "1",
        book_id: "book1",
        user_id: "user1",
        expiry_date: "2024-01-01",
      };

      // Mock tìm thấy yêu cầu đặt trước
      getUserReservationById.mockResolvedValue(mockReservation);

      const response = await supertest(app).get("/api/reservation/1");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Chi tiết yêu cầu đặt trước.");
      expect(response.body.reservation).toEqual(mockReservation);
    });
  });

  describe("Update reservation by librarian", () => {
    it("Trả về 400 nếu trạng thái không hợp lệ", async () => {
      const response = await supertest(app)
        .patch("/api/reservation/1")
        .send({ status: "không hợp lệ" });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Trạng thái không hợp lệ.");
    });
    it("Trả về 404 nếu không tìm thấy yêu cầu đặt trước", async () => {
      // Mock không tìm thấy yêu cầu đặt trước
      getUserReservationById.mockResolvedValue(null);

      const response = await supertest(app)
        .patch("/api/reservation/1") // Thay "1" bằng reservationId giả
        .send({ status: "hoàn thành" });

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Yêu cầu đặt trước không tìm thấy");
    });
    it("Trả về 200 khi cập nhật trạng thái thành công", async () => {
      // Giả sử dữ liệu trả về từ getUserReservationById là hợp lệ và cập nhật thành công
      getUserReservationById.mockResolvedValue({
        _id: "1",
        book_id: "book123",
      });
      updateReservationByStatus.mockResolvedValue({ status: "hoàn thành" });

      const response = await supertest(app)
        .patch("/api/reservation/1") // Giả sử "1" là reservationId
        .send({ status: "hoàn thành" });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Cập nhật trạng thái thành công.");
    });
    it("Trả về 200 khi cập nhật trạng thái status là hủy thành công ", async () => {
      // Giả sử dữ liệu trả về từ getUserReservationById là hợp lệ và trạng thái được cập nhật thành công
      getUserReservationById.mockResolvedValue({
        _id: "1",
        book_id: "book123",
        user_id: "user123",
      });
      getBook.mockResolvedValue({
        reserved_copies: 1,
        available_copies: 5,
        save: jest.fn(),
      });
      updateReservationByStatus.mockResolvedValue({ status: "hủy" });
      removeReversationBook.mockResolvedValue(true);

      const response = await supertest(app)
        .patch("/api/reservation/1") // Giả sử "1" là reservationId
        .send({ status: "hủy" });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Cập nhật trạng thái thành công.");
    });
  });

  describe("Remove reservation by librarian", () => {
    it("Trả về 404 nếu không tìm thấy yêu cầu đặt sách", async () => {
      // Giả sử không tìm thấy yêu cầu đặt sách
      getUserReservationById.mockResolvedValue(null);

      const response = await supertest(app).delete("/api/reservation/1");

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Yêu cầu đặt trước không tìm thấy.");
    });
    it("Trả về 200 khi xóa yêu cầu đặt sách thành công", async () => {
      deleteReservationById.mockResolvedValue(true);

      const response = await supertest(app).delete("/api/reservation/1");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Xóa yêu cầu đặt trước thành công.");
    });
  });
});
