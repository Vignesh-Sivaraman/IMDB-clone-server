const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Reporting for duty" });
});

const server = app.listen(process.env.PORT || 3005, () => {
  console.log("I am listening");
});

console.log("hi");

app.use("/actors", require("./routes/actors"));
app.use("/producers", require("./routes/producers"));
app.use("/movies", require("./routes/movies"));
