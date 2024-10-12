import { errorHandler, notFound } from "../middlewares/error.middleware.js";
import authRouter from "./auth.routes.js";
import categoryRouter from "./category.routes.js";
import bookRouter from "./book.routes.js";
import reservationRouter from "./reservation.routes.js";

const initialRouter = (app) => {
  app.use("/api/auth", authRouter);
  app.use("/api/category", categoryRouter);
  app.use("/api/book", bookRouter);
  app.use("/api/reservation", reservationRouter);

  app.use(notFound);
  app.use(errorHandler);
};

export default initialRouter;
