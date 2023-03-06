import Person from "../model/person.model.js";
import User from "../model/user.model.js";

export const SavePerson = async (req, res) => {
  const person = await Person.findOne({
    personId: req.body.personId,
    userId: req.body.userId,
  });

  try {
    if (person) {
      await Person.deleteMany({
        personId: req.body.personId,
        userId: req.body.userId,
      });

      await User.updateOne(
        { userId: req.body.userId },
        {
          $pull: {
            likePerson: req.body.personId,
          },
        }
      );

      res.json({ status: "disLike" });
    } else {
      await Person.create({
        userId: req.body.userId,
        personId: req.body.personId,
        gender: req.body.gender,
        name: req.body.name,
        popularity: req.body.popularity,
        profile_path: req.body.profile_path,
        known_for_department: req.body.known_for_department,
      });

      await User.updateOne(
        { userId: req.body.userId },
        {
          $push: {
            likePerson: [req.body.personId],
          },
        }
      );

      res.json({ status: "like" });
    }
  } catch (error) {
    return res.json({ status: "error", error: error.message });
  }
};
