import PersonData from "../model/person.model.js";

export const getPerson = async (req, res) => {
  const { id } = req.params;

  try {
    const persons = await PersonData.find({
      userId: id,
    });

    const sortedPeoples = persons
      .map((person) => person)
      .sort((a, b) => b.popularity - a.popularity);

    return res.json({ status: "ok", quote: sortedPeoples });
  } catch (error) {
    console.log("🚀 ~ file: index.js:37 ~ app.get ~ error:", error.message);
  }
};
