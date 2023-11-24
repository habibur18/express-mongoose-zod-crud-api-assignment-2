import { Request, Response } from "express";
import { userServices } from "./6_User_Servicess";
import userValidationWithZodSchema from "./3_User_Validation_Zod";

const createUser = async (req: Request, res: Response) => {
  try {
    const userInfo = req.body;
    const validationUserInfo = userValidationWithZodSchema.parse(userInfo);
    const user = await userServices.createUserIntoDB(validationUserInfo);
    res.send(user);
  } catch (err: unknown) {
    res.status(500).send({
      success: false,
      message: err.message,
      error: {
        code: 500,
        description: "User Creation Failed",
      },
    });
  }
};

export const userController = {
  createUser,
};
