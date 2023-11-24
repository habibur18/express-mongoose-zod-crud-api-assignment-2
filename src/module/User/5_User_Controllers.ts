import { Request, Response } from "express";
import { userServices } from "./6_User_Servicess";
import userValidationWithZodSchema from "./3_User_Validation_Zod";

const createUser = async (req: Request, res: Response) => {
  try {
    const userInfo = req.body;
    const validationUserInfo = userValidationWithZodSchema.parse(userInfo);
    const user = await userServices.createUserIntoDB(validationUserInfo);
    res.json({
      success: true,
      message: "User created successfully",
      data: user,
    });
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
// update user by id
const updateUserById = async (req: Request, res: Response) => {
  try {
    const userId = parseFloat(req.params.id);
    const updatedUserInfo = req.body;
    const validationUserInfo =
      userValidationWithZodSchema.parse(updatedUserInfo);

    // before update check user exist or not

    const updatedUser = await userServices.updateUserByIdIntoDB(
      userId,
      validationUserInfo
    );
    res.json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (err: unknown) {
    res.status(500).send({
      success: false,
      message: err.message,
      error: {
        code: 500,
        description: "User Update Failed",
      },
    });
  }
};

export const userController = {
  createUser,
  updateUserById,
};
