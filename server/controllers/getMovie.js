import MovieData from "../model/movie.model.js";

export const getMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const movies = await MovieData.find({
      userId: id,
    });

    const sortedMovies = movies
      .map((movie) => movie)
      .sort((a, b) => b.vote_average - a.vote_average);

    return res.json({ status: "ok", quote: sortedMovies });
  } catch (error) {
    console.log("🚀 ~ file: index.js:37 ~ app.get ~ error:", error.message);
  }
};
