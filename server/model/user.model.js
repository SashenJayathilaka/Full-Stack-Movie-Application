import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    userPhotoUrl: { type: String, required: true },
    country: { type: String, required: true },
    likeMovies: [Number],
    likePerson: [Number],
    time: { type: Date, default: Date.now },
  },
  { collection: "user-data" }
);

export default mongoose.model("UserData", User);
