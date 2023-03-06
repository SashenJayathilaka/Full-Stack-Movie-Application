import MovieData from "../model/movie.model.js";

export const getMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await MovieData.find({
      userId: id,
    });
    return res.json({ status: "ok", quote: user });
  } catch (error) {
    console.log("🚀 ~ file: index.js:37 ~ app.get ~ error:", error.message);
  }
};
