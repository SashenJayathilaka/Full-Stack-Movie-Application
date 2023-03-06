import mongoose from "mongoose";

const MovieData = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    movieId: { type: Number, required: true },
    title: String,
    overview: String,
    name: String,
    backdrop_path: String,
    poster_path: String,
    original_name: String,
    vote_average: Number,
    time: { type: Date, default: Date.now },
  },
  { collection: "movie-data" }
);

export default mongoose.model("MovieData", MovieData);
