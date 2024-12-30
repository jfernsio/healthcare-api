import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    age: Number,
    height: Number,
    weight: String,
    bloodType: String,
    gender: String,
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("User", userSchema);

export { Users}

