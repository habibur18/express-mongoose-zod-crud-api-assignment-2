import express, { Router } from "express";
import { userController } from "./5_User_Controllers";

const router: Router = express.Router();

// post route
router.post("/", userController.createUser);

export const UserRouter = router;
