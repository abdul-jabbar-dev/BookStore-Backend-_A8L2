import express from "express";
import GlobalError from "./modules/middlewares/errors/GlobalError";
import userRoute, { authRoute } from "./modules/app/users/user.route";
import categoryRoute from "./modules/app/category/category.route";
import bookRoute from "./modules/app/book/book.route";
import orderRoute from "./modules/app/order/order.route";

const app = express();
app.use(express.json());
 
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/categories",categoryRoute);
app.use("/api/v1/books", bookRoute);
app.use("/api/v1/orders", orderRoute);

app.use(GlobalError);

export default app;
