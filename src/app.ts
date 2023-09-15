import express from "express";
import userRoute from "./modules/app/users/user.route";
import GlobalError from "./modules/middlewares/errors/GlobalError";

const app = express();

app.get("/", (req, res) => {
  res.send("Home");
});
app.use(express.json());
app.use("/users", userRoute);

app.use(GlobalError);

export default app;
  