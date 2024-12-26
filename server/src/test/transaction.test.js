import { connectTest, closeConnectTest } from "../../setTest";
import supertest from "supertest";
import app, { server } from "../../index";
import {
  borrowBookUser,
  getborrowBookUser,
  getHistoryBorrowBooked,
  getTransactions,
  getTransactionById,
  deleteTransactionById,
} from "../../src/services/transaction.services.js";
import { getBook } from "../../src/services/book.services.js";
import {
  addBorrowed,
  removeBorrowed,
  addHistoryBorrowed,
} from "../../src/services/user.services.js";

jest.mock("../../src/services/transaction.services.js"); // Mock các service
jest.mock("../../src/services/book.services.js"); // Mock các service
jest.mock("../../src/services/user.services.js"); // Mock các service
beforeAll(async () => {
  await connectTest();
});

afterAll(async () => {
  await closeConnectTest();
  server.close();
});

describe("Transaction", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Borrow book", () => {
    it("Trả về 404 nếu sách không khả dụng", async () => {
      getBook.mockResolvedValue({ id: "book1", available_copies: 0 });

      const response = await supertest(app)
        .post("/api/transaction/borrow")
        .send({ book_id: "book1" });

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Sách không khả dụng.");
    });

    it("Trả về 200 nếu mượn sách thành công", async () => {
      const mockBook = { id: "book1", available_copies: 5, save: jest.fn() };
      const mockTransaction = {
        id: "trans1",
        user_id: "user1",
        book_id: "book1",
        due_date: new Date().toISOString(),
      };

      getBook.mockResolvedValue(mockBook);
      borrowBookUser.mockResolvedValue(mockTransaction);
      addBorrowed.mockResolvedValue(true);
      addHistoryBorrowed.mockResolvedValue(true);

      const response = await supertest(app)
        .post("/api/transaction/borrow")
        .send({ book_id: "book1" });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Mượn sách thành công.");
      expect(response.body.transaction).toEqual(mockTransaction);
    });
  });

  describe("Return book", () => {
    it("Trả về 400 nếu không tìm thấy giao dịch", async () => {
      // Mock `getborrowBookUser` trả về null (không tìm thấy giao dịch)
      getborrowBookUser.mockResolvedValue(null);

      const response = await supertest(app)
        .post("/api/transaction/return")
        .send({ book_id: "book1" });

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Không tìm thấy giao dịch.");
    });

    // it("Tính tiền phạt nếu trả sách trễ", async () => {
    //   const lateDate = new Date();
    //   lateDate.setDate(lateDate.getDate() - 10); // 10 ngày trễ

    //   const mockTransaction = {
    //     user_id: "user1",
    //     book_id: "book1",
    //     status: "mượn",
    //     due_date: lateDate,
    //     return_date: null,
    //     fine: 0,
    //   };

    //   const mockBook = {
    //     id: "book1",
    //     available_copies: 5,
    //     save: jest.fn(),
    //   };

    //   getborrowBookUser.mockResolvedValue(mockTransaction);
    //   getBook.mockResolvedValue(mockBook);
    //   removeBorrowed.mockResolvedValue();

    //   const response = await supertest(app)
    //     .post("/api/transaction/return")
    //     .send({ book_id: "book1" });

    //   expect(response.status).toBe(200);
    //   expect(response.body.transaction.fine).toBeGreaterThan(0); // Kiểm tra tiền phạt
    // });

    it("Trả về 200 nếu trả sách thành công", async () => {
      const mockTransaction = {
        user_id: "user1",
        book_id: "book1",
        status: "mượn",
        due_date: new Date(),
        return_date: null,
        fine: 0,
        save: jest.fn(),
      };

      const mockBook = {
        id: "book1",
        available_copies: 5,
        save: jest.fn(),
      };

      // Mock `getborrowBookUser` trả về giao dịch mượn hợp lệ
      getborrowBookUser.mockResolvedValue(mockTransaction);

      // Mock `getBook` trả về sách
      getBook.mockResolvedValue(mockBook);

      // Mock `removeBorrowed` không trả về gì vì chỉ cần xóa thông tin mượn
      removeBorrowed.mockResolvedValue(true);

      const response = await supertest(app)
        .post("/api/transaction/return")
        .send({ book_id: "book1" }); // ID của sách muốn trả

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Trả sách thành công.");
    });
  });

  describe("Extend book", () => {
    it("Trả về 400 nếu giao dịch không tồn tại", async () => {
      getborrowBookUser.mockResolvedValue(null);

      const response = await supertest(app)
        .post("/api/transaction/extend")
        .send({ book_id: "book1" });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Không tìm thấy giao dịch.");
    });

    it("Trả về 400 nếu sách đã được đặt trước", async () => {
      const mockTransaction = {
        user_id: "user1",
        book_id: "book1",
        status: "mượn",
        due_date: new Date("2024-12-24"),
        save: jest.fn(),
      };

      const mockBook = {
        id: "book1",
        reserved_copies: 1, // Có người đặt trước
      };

      getborrowBookUser.mockResolvedValue(mockTransaction);
      getBook.mockResolvedValue(mockBook);

      const response = await supertest(app)
        .post("/api/transaction/extend")
        .send({ book_id: "book1" });

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Sách đã được đặt trước bởi người khác."
      );
      expect(mockTransaction.save).not.toHaveBeenCalled(); // Giao dịch không được lưu
    });
    it("Trả về 200 nếu gia hạn mượn sách thành công", async () => {
      const mockTransaction = {
        user_id: "user1",
        book_id: "book1",
        status: "mượn",
        due_date: new Date("2024-12-24"),
        save: jest.fn(), // Mock save
      };

      const mockBook = {
        id: "book1",
        reserved_copies: 0, // Không có người đặt trước
      };

      // Mock các hàm phụ trợ
      getborrowBookUser.mockResolvedValue(mockTransaction);
      getBook.mockResolvedValue(mockBook);

      const response = await supertest(app)
        .post("/api/transaction/extend")
        .send({ book_id: "book1" });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Gia hạn mượn sách thành công.");
      expect(mockTransaction.due_date).toEqual(new Date("2024-12-31")); // Ngày trả mới
      expect(mockTransaction.save).toHaveBeenCalled(); // Kiểm tra save đã được gọi
    });
  });

  describe("History", () => {
    it("Trả về 200 và danh sách lịch sử mượn sách nếu thành công", async () => {
      const mockHistory = [
        {
          book_id: "book1",
          title: "Sách 1",
          borrow_date: "2024-12-01",
          return_date: "2024-12-10",
        },
        {
          book_id: "book2",
          title: "Sách 2",
          borrow_date: "2024-12-05",
          return_date: null, // Chưa trả sách
        },
      ];

      getHistoryBorrowBooked.mockResolvedValue(mockHistory);

      const response = await supertest(app).get("/api/transaction/history"); // Đường dẫn API

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Danh sách lịch sử mượn sách.");
      expect(response.body.data).toEqual(mockHistory); // So sánh dữ liệu trả về
    });

    it("Trả về 404 nếu không tìm thấy danh sách mượn sách", async () => {
      getHistoryBorrowBooked.mockResolvedValue(null);

      const response = await supertest(app).get("/api/transaction/history");

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Không tìm thấy danh sách mượn");
      expect(response.body.data).toBe(null);
    });
  });

  describe("Get transactions", () => {
    it("Trả về 404 nếu không tìm thấy giao dịch", async () => {
      getTransactions.mockResolvedValue(null);

      const response = await supertest(app).get("/api/transaction");

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Giao dịch không tồn tại.");
      expect(response.body.transactions).toBe(null);
    });
    it("Trả về 200 và danh sách giao dịch nếu tồn tại", async () => {
      const mockTransactions = [
        {
          id: "trans1",
          user_id: "user1",
          book_id: "book1",
          status: "đã trả",
          borrow_date: "2024-12-01",
          return_date: "2024-12-10",
        },
        {
          id: "trans2",
          user_id: "user2",
          book_id: "book2",
          status: "mượn",
          borrow_date: "2024-12-05",
          return_date: null,
        },
      ];

      getTransactions.mockResolvedValue(mockTransactions);

      const response = await supertest(app).get("/api/transaction"); // Đường dẫn API

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Danh sách giao dịch.");
      expect(response.body.transactions).toEqual(mockTransactions);
    });
  });

  describe("Get transaction", () => {
    it("Trả về 404 nếu giao dịch không tồn tại", async () => {
      getTransactionById.mockResolvedValue(null);

      const response = await supertest(app).get("/api/transaction/trans2");

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Giao dịch không tồn tại.");
      expect(response.body.transaction).toBe(null);
    });

    it("Trả về 200 và chi tiết giao dịch nếu giao dịch tồn tại", async () => {
      const mockTransaction = {
        id: "trans1",
        user_id: "user1",
        book_id: "book1",
        status: "đã trả",
        borrow_date: "2024-12-01",
        return_date: "2024-12-10",
        fine: 0,
      };

      getTransactionById.mockResolvedValue(mockTransaction);

      const response = await supertest(app).get("/api/transaction/trans1"); // Đường dẫn API

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Chi tiết giao dịch.");
      expect(response.body.transaction).toEqual(mockTransaction);
    });
  });

  describe("Delete transaction", () => {
    it("Trả về 404 nếu giao dịch không tồn tại", async () => {
      deleteTransactionById.mockResolvedValue(null);

      const response = await supertest(app).delete("/api/transaction/trans2");

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Giao dịch không tồn tại.");
    });
    it("Trả về 200 nếu xóa giao dịch thành công", async () => {
      const mockTransaction = {
        id: "trans1",
        user_id: "user1",
        book_id: "book1",
        status: "đã trả",
      };

      deleteTransactionById.mockResolvedValue(mockTransaction);

      const response = await supertest(app).delete("/api/transaction/trans1");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Xóa giao dịch thành công.");
    });
  });
});
