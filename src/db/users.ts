import mongoose, { Schema, Model } from "mongoose";

interface UserSchemaProp extends Document {
  username: string;
  email: string;
  authentication: {
    password: string;
    salt: string;
    sessionToken: string;
  };
}

const UserSchema: Schema<UserSchemaProp> = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
      password: { type: String, required: true, select: false },
      salt: { type: String, select: false },
      sessionToken: { type: String, select: false },
    },
  },
  {
    collection: "test_ts",
    timestamps: true,
  }
);

export const UserModel: Model<UserSchemaProp> = mongoose.model(
  "User",
  UserSchema
);

export const getUsers = () => UserModel.find({});
export const getUserByEmail = (email: string) =>
  UserModel.findOne({ email: email });
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken });
export const getUserById = (id: string) => UserModel.findById({ id });
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());
export const deleteUserById = (id: string) => UserModel.deleteOne({ _id: id });
export const updateUserById = (id: string, values: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, values);
