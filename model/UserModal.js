import mongoose from "mongoose";

const UserModal = mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});

export const UserDetail = mongoose.model("userPost", UserModal);
