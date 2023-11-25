import bcrypt from "bcrypt";
import { TOrder, TUser } from "./1_User_Interface";
import User from "./2_User_Model";
import Config from "../../app/Config";

const createUserIntoDB = async (userData: TUser) => {
  const user = await User.create(userData);
  return user;
};

// get a list of all users
const getAllUsersFromDB = async () => {
  const users = await User.aggregate([
    // {$match:{}},
    {
      $project: {
        username: 1,
        fullName: 1,
        age: 1,
        email: 1,
        address: 1,
        _id: 0,
      },
    },
  ]);
  return users;
};

// get user by id
const getUserByIdFromDB = async (userId: number) => {
  const user = await User.isUserExists(userId);
  return user;
};

// update user by id
const updateUserByIdIntoDB = async (userId: number, userData: TUser) => {
  if (userData.password) {
    userData.password = await bcrypt.hash(
      userData.password,
      Number(Config.BCRYPT_SALT_ROUNDS)
    );
  }
  const result = await User.findOneAndUpdate(
    { userId },
    { $set: userData },
    {
      new: true,
      runValidators: true,
      projection: { password: 0, isDeleted: 0, orders: 0, __v: 0 },
    }
  );
  return result;
};

// change user IsDeleted status
const deleteUserByIdIntoDB = async (userId: number) => {
  const result = await User.findOneAndUpdate(
    { userId },
    { $set: { isDeleted: true } }
  );
  return result;
};

// order management
// add order to user

const createOrderIntoDB = async (userId: number, orderData: TOrder) => {
  const result = await User.findOneAndUpdate(
    { userId },
    { $push: { orders: orderData } }
  );

  return result;
};

// retrive all orders for a specific user
const getOrdersOfUserById = async (userId: number) => {
  const result = await User.findOne({ userId }, { orders: 1, _id: 0 });
  console.log("from db", result);
  return result;
};

export const userServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getUserByIdFromDB,
  updateUserByIdIntoDB,
  deleteUserByIdIntoDB,
  // order management
  createOrderIntoDB,
  getOrdersOfUserById,
};
