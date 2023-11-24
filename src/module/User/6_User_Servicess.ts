import bcrypt from "bcrypt";
import { TUser } from "./1_User_Interface";
import User from "./2_User_Model";
import Config from "../../app/Config";

const createUserIntoDB = async (userData: TUser) => {
  const user = await User.create(userData);
  return user;
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

export const userServices = {
  createUserIntoDB,
  getUserByIdFromDB,
  updateUserByIdIntoDB,
};
