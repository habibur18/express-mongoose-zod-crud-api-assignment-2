import { Request, Response } from "express";
import { userServices } from "./6_User_Servicess";
import userValidationWithZodSchema from "./3_User_Validation_Zod";

const createUser = async (req: Request, res: Response) => {
  try {
    const userInfo = req.body;
    const userId = parseFloat(userInfo.userId);
    // before create check user exist or not
    const userCheck = await userServices.getUserByIdFromDB(userId);
    if (userCheck) {
      return res.status(409).send({
        success: false,
        message: `User with id ${userInfo.userId} already exists`,
        error: {
          code: 409,
          description: "User Already Exists",
        },
      });
    }
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

// get user by id
const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = parseFloat(req.params.id);

    // before get check user exist or not
    const userCheck = await userServices.getUserByIdFromDB(userId);

    if (!userCheck) {
      return res.status(404).send({
        success: false,
        message: `User with id ${userId} not found`,
        error: {
          code: 404,
          description: "User Not Found",
        },
      });
    }
    const user = await userServices.getUserByIdFromDB(userId);
    res.json({
      success: true,
      message: `User Retrieved Successfully with id ${userId}`,
      data: user,
    });
  } catch (err: unknown) {
    res.status(500).send({
      success: false,
      message: err.message,
      error: {
        code: 500,
        description: "User Retrieval Failed",
      },
    });
  }
};

// update user by id
const updateUserById = async (req: Request, res: Response) => {
  try {
    const userId = parseFloat(req.params.id);

    // before update check user exist or not
    const userCheck = await userServices.getUserByIdFromDB(userId);
    if (!userCheck) {
      return res.status(404).send({
        success: false,
        message: `User with id ${userId} not found`,
        error: {
          code: 404,
          description: "User Not Found",
        },
      });
    }

    const updatedUserInfo = req.body;
    const validationUserInfo =
      userValidationWithZodSchema.parse(updatedUserInfo);

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
  getUserById,
  updateUserById,
};
