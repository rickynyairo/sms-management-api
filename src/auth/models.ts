import { model, Schema, Document, DocumentQuery } from "mongoose";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "./interfaces";
import config from "../config";

interface TokenData {
  id: string;
  userName: string;
  token: string;
}
const addressSchema = new Schema({
  city: String,
  street: String
});

const userSchema = new Schema({
  address: addressSchema,
  userName: String,
  password: String
});

export const userModel = model<User & Document>("User", userSchema);

export const generateJWT = (user: any): string => {
  const expiresIn = "7d";
  const { userName, id } = user;
  return jwt.sign(
    {
      userName,
      id,
      expiresIn
    },
    config.SESSION_SECRET,
    { expiresIn }
  );
};

export const toAuthJSON = (user: any): TokenData => {
  const { userName, id } = user;
  return {
    id,
    userName,
    token: generateJWT(user)
  };
};

export const createUser = (user: User & Document, callback: any) => {
  hash(user.password, 10, (error, hashedPassword) => {
    if (error) throw error;
    user.password = hashedPassword;
    user.save(callback);
  });
};

export const getUserByUserName = (userName: string) => {
  return userModel.findOne({ userName });
};

export const getUserById = (id: string) => {
  return userModel.findById(id);
};

export const comparePassword = (password: string, hash: string) => {
  return compare(password, hash);
};
