import { z } from "zod";

const fullNameValidationZodSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
});

const addressValidationWithSchema = z.object({
  street: z.string().trim().min(1, "Street is required"),
  city: z.string().trim().min(1, "City is required"),
  country: z.string().trim().min(1, "Country is required"),
});

export const orderValidationWithSchema = z.object({
  productName: z.string().trim().min(1, "Product name is required"),
  price: z.number().min(1, "Price is required"),
  quantity: z.number().min(1, "Quantity is required"),
});

export const userValidationWithZodSchema = z.object({
  userId: z.number().min(1, "User ID is required"),
  username: z.string().trim().min(1, "Username is required"),
  password: z.string().trim().min(1, "Password is required"),
  fullName: fullNameValidationZodSchema,
  age: z.number().min(1, "Age is required"),
  email: z.string().trim().min(1, "Email is required"),
  isActive: z.boolean().default(true),
  hobbies: z.array(z.string().trim()),
  address: addressValidationWithSchema,
  orders: z.array(orderValidationWithSchema).optional(),
  isDeleted: z.boolean().default(false).optional(),
});

export default userValidationWithZodSchema;
