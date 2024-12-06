import { errorHandler, notFound } from "../middlewares/error.middleware.js";
import authRouter from "./auth.routes.js";
import categoryRouter from "./category.routes.js";
import authorRouter from "./author.routes.js";
import userRouter from "./user.routes.js";
import bookRouter from "./book.routes.js";
import transactionRouter from "./transaction.routes.js";
import reservationRouter from "./reservation.routes.js";
import publisherRouter from "./publisher.routes.js";

const initialRouter = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/user", userRouter);
  app.use("/api/category", categoryRouter);
  app.use("/api/author", authorRouter);
  app.use("/api/publisher", publisherRouter);
  app.use("/api/book", bookRouter);
  app.use("/api/transaction", transactionRouter);
  app.use("/api/reservation", reservationRouter);

  app.use(notFound);
  app.use(errorHandler);
};

export default initialRouter;
