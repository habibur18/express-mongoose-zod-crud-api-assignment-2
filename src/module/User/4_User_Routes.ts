import express, { Router } from "express";
import { userController } from "./5_User_Controllers";

const router: Router = express.Router();

// post route
router
  .post("/", userController.createUser)
  .get("/", userController.getAllUsers)
  .get("/:userId", userController.getUserById)
  .put("/:userId", userController.updateUserById)
  .delete("/:userId", userController.deleteUserById);

export const UserRouter = router;
