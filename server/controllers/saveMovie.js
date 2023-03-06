import Movie from "../model/movie.model.js";
import User from "../model/user.model.js";

export const saveMovies = async (req, res) => {
  const movie = await Movie.findOne({
    movieId: req.body.movieId,
    userId: req.body.userId,
  });

  try {
    if (movie) {
      await Movie.deleteMany({
        movieId: req.body.movieId,
        userId: req.body.userId,
      });

      await User.updateOne(
        { userId: req.body.userId },
        {
          $pull: {
            likeMovies: req.body.movieId,
          },
        }
      );

      res.json({ status: "disLike" });
    } else {
      await Movie.create({
        userId: req.body.userId,
        movieId: req.body.movieId,
        title: req.body.title,
        overview: req.body.overview,
        name: req.body.name,
        backdrop_path: req.body.backdrop_path,
        poster_path: req.body.poster_path,
        original_name: req.body.original_name,
        vote_average: req.body.vote_average,
      });

      await User.updateOne(
        { userId: req.body.userId },
        {
          $push: {
            likeMovies: [req.body.movieId],
          },
        }
      );

      res.json({ status: "like" });
    }
  } catch (error) {
    return res.json({ status: "error", error: error.message });
  }
};
