import { connectTest, closeConnectTest } from "../../setTest";
import supertest from "supertest";
import app, { server } from "../../index";
import {
  getAllBooks,
  getBook,
  addReview,
  deleteReview,
  addBook,
  updateBook,
  deleteBook,
  getReviewsBook,
  getReviewBook,
  deleteBookReviewById,
} from "../../src/services/book.services";
import { getProfile } from "../../src/services/user.services.js";
import { getCategoryBookId } from "../../src/services/category.services.js";
import { getAuthorId } from "../../src/services/author.services.js";
import { getPublisherId } from "../../src/services/publisher.services.js";

jest.mock("../../src/services/book.services.js"); // Mock các service
jest.mock("../../src/services/user.services.js"); // Mock các service
jest.mock("../../src/services/category.services.js"); // Mock các service
jest.mock("../../src/services/author.services.js"); // Mock các service
jest.mock("../../src/services/publisher.services.js"); // Mock các service

beforeAll(async () => {
  await connectTest();
}, 5000);

afterAll(async () => {
  await closeConnectTest();
  server.close();
});

describe("Book", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe("Get Books", () => {
    it("Trả về 404 nếu không tìm thấy sách", async () => {
      // Mock `getAllBooks` trả về null
      getAllBooks.mockResolvedValue(null);

      const response = await supertest(app)
        .get("/api/book")
        .query({ search: "unknown" });

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Không tìm thấy sách");
    });

    it("Trả về danh sách sách khi tìm kiếm thành công", async () => {
      // Mock dữ liệu sách giả lập
      const mockBooks = [
        { title: "Book 1", author: "Author 1" },
        { title: "Book 2", author: "Author 2" },
      ];

      // Mock `getAllBooks` trả về danh sách sách
      getAllBooks.mockResolvedValue(mockBooks);

      const response = await supertest(app)
        .get("/api/book")
        .query({ search: "Book" });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Danh sách sách");
      expect(response.body.books).toEqual(mockBooks);
    });

    it("Trả về danh sách sách khi không có từ khóa tìm kiếm", async () => {
      // Mock dữ liệu sách giả lập
      const mockBooks = [
        { title: "Book 1", author: "Author 1" },
        { title: "Book 2", author: "Author 2" },
      ];

      // Mock `getAllBooks` trả về danh sách sách
      getAllBooks.mockResolvedValue(mockBooks);

      const response = await supertest(app).get("/api/book");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Danh sách sách");
      expect(response.body.books).toEqual(mockBooks);
    });
  });

  describe("Get book", () => {
    it("Trả về 200 và thông tin sách nếu tìm thấy sách", async () => {
      const mockBook = {
        _id: "12345",
        title: "Sample Book",
        author: "Sample Author",
      };

      // Mock `getBook` trả về dữ liệu sách
      getBook.mockResolvedValue(mockBook);

      const response = await supertest(app).get("/api/book/12345");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Chi tiết sách");
      expect(response.body.book).toEqual(mockBook);
    });
    it("Trả về 404 nếu không tìm thấy sách", async () => {
      // Mock `getBook` trả về null
      getBook.mockResolvedValue(null);

      const response = await supertest(app).get("/api/book/unknownId");

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Không tìm thấy sách");
      expect(response.body.book).toBe("");
    });
  });

  describe("Create review", () => {
    it("Trả về 201 và thông báo thành công nếu đánh giá được tạo", async () => {
      const mockReview = {
        book_id: "book123",
        user_id: "user123",
        rating: 5,
        comment: "Amazing book!",
      };

      // Mock `addReview` trả về dữ liệu review
      addReview.mockResolvedValue(mockReview);

      const response = await supertest(app)
        .post("/api/book/review/book123")
        .send({
          rating: 5,
          comment: "Amazing book!",
        });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Đánh giá sách thành công");
    });

    it("Trả về 500 nếu đánh giá không được tạo", async () => {
      // Mock `addReview` trả về null
      addReview.mockResolvedValue(null);

      const response = await supertest(app)
        .post("/api/book/review/book123")
        .send({
          rating: 3,
          comment: "Not bad.",
        });

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Đánh giá không thành công");
    });
  });

  describe("Remove review", () => {
    it("Trả về 500 nếu người dùng không có quyền xóa đánh giá", async () => {
      // Mock `getProfile` trả về null (người dùng không tồn tại hoặc không có quyền)
      getProfile.mockResolvedValue(null);

      const response = await supertest(app).delete(
        "/api/book/review/review123"
      );

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Bạn không có quyèn xóa");
    });

    it("Trả về 201 nếu xóa đánh giá thành công", async () => {
      // Mock `getProfile` trả về user hợp lệ
      getProfile.mockResolvedValue({ user_id: "user123" });

      // Mock `deleteReview` trả về true (đánh giá được xóa)
      deleteReview.mockResolvedValue(true);

      const response = await supertest(app).delete(
        "/api/book/review/review123"
      );

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Xóa đánh giá thành công");
    });
  });

  describe("Create book by librarian", () => {
    it("Trả về 404 nếu thể loại sách không tồn tại", async () => {
      getCategoryBookId.mockResolvedValue(null);
      const response = await supertest(app).post("/api/book").send({
        category: "invalidCategory",
        author: "validAuthor",
        publisher: "validPublisher",
        title: "Sample Book",
        isbn: "001",
        total_copies: 20,
        available_copies: 20,
      });

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Thể loại sách không tồn tại");
    });

    it("Trả về 404 nếu tác giả không tồn tại", async () => {
      getCategoryBookId.mockResolvedValue(true);
      getAuthorId.mockResolvedValue(null);

      const response = await supertest(app).post("/api/book").send({
        category: "invalidCategory",
        author: "validAuthor",
        publisher: "validPublisher",
        title: "Sample Book",
        isbn: "001",
        total_copies: 20,
        available_copies: 20,
      });

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Tác giả không tồn tại");
    });

    it("Trả về 404 nếu NXB không tồn tại", async () => {
      getCategoryBookId.mockResolvedValue(true);
      getAuthorId.mockResolvedValue(true);
      getPublisherId.mockResolvedValue(null);

      const response = await supertest(app).post("/api/book").send({
        category: "invalidCategory",
        author: "validAuthor",
        publisher: "validPublisher",
        title: "Sample Book",
        isbn: "001",
        total_copies: 20,
        available_copies: 20,
      });

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("NXB không tồn tại");
    });

    it("Trả về 201 nếu thêm sách thành công", async () => {
      const mockBook = {
        category: "invalidCategory",
        author: "validAuthor",
        publisher: "validPublisher",
        title: "Sample Book",
        isbn: "001",
        total_copies: 20,
        available_copies: 20,
      };

      getCategoryBookId.mockResolvedValue(true);
      getAuthorId.mockResolvedValue(true);
      getPublisherId.mockResolvedValue(true);
      addBook.mockResolvedValue(mockBook);

      const response = await supertest(app).post("/api/book").send({
        category: "invalidCategory",
        author: "validAuthor",
        publisher: "validPublisher",
        title: "Sample Book",
        isbn: "001",
        total_copies: 20,
        available_copies: 20,
      });

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Sách đã được thêm thành công");
      expect(response.body.book).toEqual(mockBook);
    });
  });

  describe("Edit book by librarian", () => {
    it("Trả về 400 nếu không cung cấp thông tin cập nhật", async () => {
      const response = await supertest(app)
        .put("/api/book/validBookId")
        .send({}); // Không gửi dữ liệu

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Thông tin cập nhật là bắt buộc");
    });

    it("Trả về 404 nếu sách không tồn tại", async () => {
      // Mock `updateBook` trả về null
      updateBook.mockResolvedValue(null);

      const response = await supertest(app)
        .put("/api/book/invalidBookId")
        .send({ title: "New Title" });

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Không tìm thấy sách");
    });

    it("Trả về 200 và cập nhật sách nếu dữ liệu hợp lệ", async () => {
      const updatedBookMock = {
        _id: "validBookId",
        title: "Updated Title",
        author: "Author Name",
      };

      // Mock `updateBook` trả về thông tin sách sau khi cập nhật
      updateBook.mockResolvedValue(updatedBookMock);

      const response = await supertest(app)
        .put("/api/book/validBookId")
        .send({ title: "Updated Title" });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Cập nhật sách thành công");
      expect(response.body.book).toEqual(updatedBookMock);
    });
  });

  describe("Remove book by librarian", () => {
    it("Trả về 404 nếu sách không tồn tại", async () => {
      // Mock `deleteBook` trả về null
      deleteBook.mockResolvedValue(null);

      const response = await supertest(app).delete("/api/book/invalidBookId");

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Không tìm thấy sách");
    });
    it("Trả về 200 nếu xóa sách thành công", async () => {
      // Mock `deleteBook` trả về thông tin sách đã xóa
      const deletedBookMock = {
        _id: "validBookId",
        title: "Book Title",
        author: "Author Name",
      };
      deleteBook.mockResolvedValue(deletedBookMock);

      const response = await supertest(app).delete("/api/book/validBookId");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Xóa sách thành công");
    });
  });

  describe("Get reviews by librarian", () => {
    it("Trả về 404 nếu không tìm thấy đánh giá", async () => {
      // Mock `getReviewsBook` trả về null
      getReviewsBook.mockResolvedValue(null);

      const response = await supertest(app).get("/api/book/review");

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Không tìm thấy sách");
    });

    // it("Trả về 201 nếu lấy danh sách đánh giá thành công", async () => {
    //   // Mock `getReviewsBook` trả về danh sách đánh giá
    //   const reviewsMock = [
    //     {
    //       user_id: "user1",
    //       book_id: "book1",
    //       rating: 5,
    //       comment: "Tuyệt vời!",
    //     },
    //     { user_id: "user2", book_id: "book1", rating: 4, comment: "Rất tốt!" },
    //   ];
    //   getReviewsBook.mockResolvedValue(reviewsMock);

    //   const response = await supertest(app).get("/api/book/reviews");

    //   expect(response.status).toBe(201);
    //   expect(response.body.success).toBe(true);
    //   expect(response.body.message).toBe("Danh sách đánh giá");
    //   expect(response.body.reviews).toEqual(reviewsMock);
    // });
  });

  describe("Get review by librarian", () => {
    it("Trả về 404 nếu không tìm thấy đánh giá", async () => {
      // Mock `getReviewBook` trả về null
      getReviewBook.mockResolvedValue(null);

      const response = await supertest(app).get("/api/book/review/invalidId");

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Không tìm thấy đánh giá");
    });
    it("Trả về 201 nếu tìm thấy đánh giá", async () => {
      // Mock `getReviewBook` trả về chi tiết đánh giá
      const reviewMock = {
        user_id: "user1",
        book_id: "book1",
        rating: 5,
        comment: "Tuyệt vời!",
      };
      getReviewBook.mockResolvedValue(reviewMock);

      const response = await supertest(app).get("/api/book/review/validId");

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Chi tiết đánh giá");
      expect(response.body.review).toEqual(reviewMock);
    });
  });

  describe("Remove review by librarian", () => {
    // it("Trả về 404 nếu không tìm thấy đánh giá để xóa", async () => {
    //   // Mock `deleteBookReviewById` trả về null
    //   deleteBookReviewById.mockResolvedValue(false);

    //   const response = await supertest(app).delete(
    //     "/api/book/review/invalidId"
    //   );

    //   expect(response.status).toBe(404);
    //   expect(response.body.success).toBe(false);
    //   expect(response.body.message).toBe("Không tìm thấy đánh giá");
    // });
    it("Trả về 201 nếu xóa đánh giá thành công", async () => {
      // Mock `deleteBookReviewById` trả về true
      deleteBookReviewById.mockResolvedValue(true);

      const response = await supertest(app).delete("/api/book/review/validId");

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Xóa đánh giá thành công");
    });
  });
});
