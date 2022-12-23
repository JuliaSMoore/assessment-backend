const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const { getCompliment, getFortune, getCharacters, deleteCharacter, updateCoolness, createCharacter } = require('./controller')

app.get("/api/compliment", getCompliment);

app.get(`/api/fortune`, getFortune)

app.get(`/api/characters`, getCharacters)

app.delete(`/api/characters/:id`, deleteCharacter)

app.put(`/api/characters/:id`, updateCoolness)

app.post(`/api/characters`, createCharacter)

app.listen(4000, () => console.log("Server running on 4000"));
