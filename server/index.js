import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";

import { findMovies } from "./controllers/findMovie.js";
import { findPerson } from "./controllers/findPerson.js";
import { getMovie } from "./controllers/getMovie.js";
import { getPerson } from "./controllers/getPerson.js";
import { saveMovies } from "./controllers/saveMovie.js";
import { SavePerson } from "./controllers/savePerson.js";
import { suggestionUser } from "./controllers/suggestionUser.js";
import { getUser } from "./controllers/user.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3001;

const pusher = new Pusher({
  appId: "1563131",
  key: "9a52b8f05435b6e35101",
  secret: "f7f36d4243b06c8eadb1",
  cluster: "ap2",
  useTLS: true,
});

// middleware
app.use(express.json());
app.use(cors());

// Db config
const connection_Url = process.env.MONGODB_URL;

mongoose
  .connect(connection_Url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err));

mongoose.connection.once("open", () => {
  console.log("Db CONNECTED");

  const changeStream = mongoose.connection.collection("movie-data").watch();
  changeStream.on("change", (change) => {
    pusher.trigger("movie-data", "new-movieData", {
      change: change,
    });
  });

  const changePerson = mongoose.connection.collection("person-data").watch();
  changePerson.on("change", (change) => {
    pusher.trigger("person-data", "new-personData", {
      change: change,
    });
  });
});

app.get("/", (req, res) => res.status(200).send("Movie App Build"));

app.post("/user", getUser);
app.get("/movie/:id", getMovie);
app.post("/save/movie", saveMovies);
app.post("/find/movie", findMovies);
app.get("/person/:id", getPerson);
app.post("/save/person", SavePerson);
app.post("/find/person", findPerson);
app.get("/suggestion/:id", suggestionUser);

app.listen(port, () => console.log(`listen on localhost:${port}`));
