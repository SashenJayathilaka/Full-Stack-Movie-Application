import PersonData from "../model/person.model.js";

export const findPerson = async (req, res) => {
  const person = await PersonData.findOne({
    userId: req.body.userId,
    personId: req.body.personId,
  });

  if (person) {
    return res.json({
      status: "exits",
      quote: person,
    });
  } else {
    return res.json({
      status: "nonExits",
    });
  }
};
