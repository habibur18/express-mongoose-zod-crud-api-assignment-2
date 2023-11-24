import { Schema, model, connect } from "mongoose";
import bcrypt from "bcrypt";
import { IUserModel, TAddress, TOrder, TUser } from "./1_User_Interface";
import { string } from "zod";

const fullNameSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "Last name is required"],
    },
  },
  {
    _id: false,
  }
);

const addressSchema = new Schema<TAddress>(
  {
    street: {
      type: String,
      trim: true,
      required: [true, "Street is required"],
    },
    city: {
      type: String,
      trim: true,
      required: [true, "City is required"],
    },
    country: {
      type: String,
      trim: true,
      required: [true, "Country is required"],
    },
  },
  {
    _id: false,
  }
);

const ordersSchema = new Schema<TOrder>(
  {
    productName: {
      type: String,
      trim: true,
      required: [true, "Product name is required"],
    },
    price: {
      type: Number,
      trim: true,
      required: [true, "Price is required"],
    },
    quantity: {
      type: Number,
      trim: true,
      required: [true, "Quantity is required"],
    },
  },
  {
    _id: false,
  }
);

const userSchema = new Schema<TUser, IUserModel>({
  userId: {
    type: Number,
    trim: true,
    unique: true,
    required: [true, "User ID is required"],
  },
  username: {
    type: String,
    trim: true,
    required: [true, "Username is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  fullName: fullNameSchema,
  age: {
    type: Number,
    required: [true, "Age is required"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "Email is required"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: {
    type: [String],
    required: [true, "Hobbies are required"],
  },
  address: {
    type: addressSchema,
    required: [true, "Address is required"],
  },
  orders: [
    {
      type: ordersSchema,
    },
  ],
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const User = model<TUser, IUserModel>("User", userSchema);

export default User;
