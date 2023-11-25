import { Request, Response } from "express";
import { userServices } from "./6_User_Servicess";
import userValidationWithZodSchema, {
  orderValidationWithSchema,
} from "./3_User_Validation_Zod";

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
    // remove pasword isDeleted and _id, orders and __v
    const { password, isDeleted, orders, _id, __v, ...rest } = user.toJSON();
    res.json({
      success: true,
      message: "User created successfully!",
      data: rest,
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

// get all users list
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userServices.getAllUsersFromDB();
    res.json({
      success: true,
      message: "Users fetched successfully!",
      data: users,
    });
  } catch (err: unknown) {
    res.status(500).send({
      success: false,
      message: err.message,
      error: {
        code: 500,
        description: "Users Retrieval Failed",
      },
    });
  }
};

// get user by id
const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = parseFloat(req.params.userId);

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
        description: "User fetch Failed",
      },
    });
  }
};

// update user by id
const updateUserById = async (req: Request, res: Response) => {
  try {
    const userId = parseFloat(req.params.userId);

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
      message: "User updated successfully!",
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

// change user IsDeleted status
const deleteUserById = async (req: Request, res: Response) => {
  try {
    const userId = parseFloat(req.params.userId);
    // before delete check user exist or not
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
    const deletedUser = await userServices.deleteUserByIdIntoDB(userId);
    res.json({
      success: true,
      message: "User deleted successfully",
      data: null,
    });
  } catch (err: unknown) {
    res.status(500).send({
      success: false,
      message: err.message,
      error: {
        code: 500,
        description: "User Deletion Failed",
      },
    });
  }
};

// order management
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderInfo = req.body;
    const userId = parseFloat(req.params.userId);

    // before create check user exist or not
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
    const validationOrderInfo = orderValidationWithSchema.parse(orderInfo);
    const createdOrder = await userServices.createOrderIntoDB(
      userId,
      validationOrderInfo
    );
    res.json({
      success: true,
      message: "Order created successfully!",
      data: null,
    });
  } catch (err: unknown) {
    res.status(500).send({
      success: false,
      message: err.message,
      error: {
        code: 500,
        description: "Order Creation Failed",
      },
    });
  }
};

// get a specific orders by user id
const getOrdersById = async (req: Request, res: Response) => {
  const userId = parseFloat(req.params.userId);

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
  const orders = await userServices.getOrdersOfUserById(userId);
  // check orders empty or not
  if (!orders) {
    return res.status(404).send({
      success: false,
      message: `User with id ${userId} has no orders`,
      error: {
        code: 404,
        description: "User has no orders",
      },
    });
  }
  res.json({
    success: true,
    message: "Orders fetched successfully!",
    data: orders,
  });
};

export const userController = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  // user orders management
  createOrder,
  getOrdersById,
};
