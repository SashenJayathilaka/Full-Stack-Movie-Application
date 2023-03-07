import User from "../model/user.model.js";

export const getUserData = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findOne({
      userId: id,
    });
    return res.json({ status: "ok", quote: user });
  } catch (error) {
    return res.json({ status: "bad", error: error.message });
  }
};
