import { Model } from "mongoose";

interface TFullName {
  firstName: string;
  lastName: string;
}
export interface TAddress {
  street: string;
  city: string;
  country: string;
}

export interface TOrder {
  productName: string;
  price: number;
  quantity: number;
}

export interface TUser {
  userId: number;
  username: string;
  password: string;
  fullName: TFullName;
  age: number;
  email: string;
  isActive: boolean;
  hobbies: string[];
  address: TAddress;
  orders?: TOrder[];
  isDeleted?: boolean;
  __v?: number;
}

export interface IUserModel extends Model<TUser> {
  isUserExists(userId: number): Promise<TUser | null>;
}
