import express from "express";
import GlobalError from "./modules/middlewares/errors/GlobalError";
import userRoute, { authRoute } from "./modules/app/users/user.route";
import categoryRoute from "./modules/app/category/category.route";

const app = express();

app.get("/", (req, res) => {
  res.send("Home");
});
app.use(express.json());
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/categories", categoryRoute);

app.use(GlobalError);

export default app;
