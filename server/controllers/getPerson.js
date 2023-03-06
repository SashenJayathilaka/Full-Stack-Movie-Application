import PersonData from "../model/person.model.js";

export const getPerson = async (req, res) => {
  const { id } = req.params;

  try {
    const person = await PersonData.find({
      userId: id,
    });
    return res.json({ status: "ok", quote: person });
  } catch (error) {
    console.log("🚀 ~ file: index.js:37 ~ app.get ~ error:", error.message);
  }
};
