import borrowRecordModel from "../models/borrowRecord.models.js";
export const borrowRecordbook = async ({
  userId,
  bookId,
  borrowedDate,
  dueDate,
}) => {
  await borrowRecordModel.create({
    userId,
    bookId,
    borrowedDate,
    dueDate,
  });
};

export const updateBorrowRecordbook = async ({
  userId,
  bookId,
  returnedDate,
}) => {
  await borrowRecordModel.findOneAndUpdate(
    { userId, bookId },
    {
      returnedDate,
    }
  );
};
