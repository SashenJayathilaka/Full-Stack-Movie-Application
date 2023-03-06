import User from "../model/user.model.js";

export const suggestionUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({
      userId: id,
    });

    if (user) {
      const process = async () => {
        const movieArr = user.likeMovies;
        const peopleArr = user.likePerson;

        const checkCondition = movieArr.length >= 5 && peopleArr.length >= 2;

        if (checkCondition) {
          var isRun = true;
          const suggestionUser = [];

          while (isRun) {
            const randomSuggestionMovie =
              movieArr[Math.floor(Math.random() * movieArr.length)];
            const randomSuggestionPeople =
              peopleArr[Math.floor(Math.random() * peopleArr.length)];

            const userLikeMovies = await User.find({
              userId: { $ne: id },
              likeMovies: { $gt: randomSuggestionMovie },
              likePerson: { $gt: randomSuggestionPeople },
            });

            if (userLikeMovies.length > 0) {
              isRun = false;
              suggestionUser.push(userLikeMovies);
            } else {
              isRun = true;
            }
          }

          if (suggestionUser.length < 1) return;

          return res.json({
            status: "ok",
            quote: suggestionUser,
          });
        } else {
          return res.json({
            status: "bad",
            quote: "you have not yet enoughs like movies and peoples",
          });
        }
      };

      process();
    }
  } catch (error) {
    return res.json({ status: "bad", quote: error.message });
  }
};
