import { TUser } from "./1_User_Interface";
import User from "./2_User_Model";

const createUserIntoDB = async (userData: TUser) => {
  const user = await User.create(userData);
  return user;
};

export const userServices = {
  createUserIntoDB,
};
