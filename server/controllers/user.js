import User from "../model/user.model.js";

export const getUser = async (req, res) => {
  const user = await User.findOne({
    userId: req.body.userId,
  });

  if (user) {
    return res.json({
      status: "exits",
      error: "user Already exits",
      quote: user,
    });
  } else {
    try {
      await User.create({
        userId: req.body.userId,
        name: req.body.name,
        email: req.body.email,
        userPhotoUrl: req.body.userPhotoUrl,
        country: req.body.country,
      });
      res.json({ status: "ok" });
    } catch (error) {
      return res.json({ status: "error", error: error.message });
    }
  }
};
