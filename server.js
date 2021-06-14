const express = require("express");
const api = require("./routes/api.js");
const path = require("path");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", api);
app.use(express.static(__dirname+'/TweetSentimentAnalysis'))

app.get("/*", (req, res) => res.sendFile('/index.html'));

app.listen(PORT, () => console.log("Listening on http://localhost:" + PORT));

// https://djtweetapi.herokuapp.com/api/quick/
