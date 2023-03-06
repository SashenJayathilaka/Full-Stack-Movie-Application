import mongoose from "mongoose";

const PersonData = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    personId: { type: Number, required: true },
    gender: Number,
    name: String,
    popularity: Number,
    profile_path: String,
    known_for_department: String,
    time: { type: Date, default: Date.now },
  },
  { collection: "person-data" }
);

export default mongoose.model("PersonData", PersonData);
