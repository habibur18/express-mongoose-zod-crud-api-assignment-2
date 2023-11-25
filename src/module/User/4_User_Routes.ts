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

// user order api
router
  .post("/:userId/orders", userController.createOrder)
  .get("/:userId/orders", userController.getOrdersById);

export const UserRouter = router;
