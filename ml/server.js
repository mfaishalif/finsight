require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const predictRouter = require("./routes/predict");

const app = express();
app.use(bodyParser.json());

app.use("/api/predict", predictRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Express server running on port ${PORT}`);
});