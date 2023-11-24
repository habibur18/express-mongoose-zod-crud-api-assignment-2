import express, { Application } from "express";
import cors from "cors";
import { UserRouter } from "./module/User/4_User_Routes";
const app: Application = express();

// parse application/json
app.use(express.json());
// allow cors
app.use(cors());

// routes

app.use("/api/users", UserRouter);

// 404 handler
app.all("*", (req, res) => {
  res.status(404).send("Not found");
});
export default app;
