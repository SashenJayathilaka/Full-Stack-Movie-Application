import MovieData from "../model/movie.model.js";

export const findMovies = async (req, res) => {
  const user = await MovieData.findOne({
    userId: req.body.userId,
    movieId: req.body.movieId,
  });

  if (user) {
    return res.json({
      status: "exits",
      quote: user,
    });
  } else {
    return res.json({
      status: "nonExits",
    });
  }
};
