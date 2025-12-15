const express = require("express");
const router = express.Router();
const axios = require("axios");

const ML_SPACE_URL = process.env.ML_SPACE_URL; // URL HuggingFace Space FastAPI

router.post("/", async (req, res) => {
  const { base_currency, target_currency, period } = req.body;

  // validasi input
  if (!base_currency || !target_currency || ![3,7].includes(period)) {
    return res.status(400).json({ error: "Input tidak valid" });
  }

  // mapping periode frontend ke horizon FastAPI
  const horizonMap = { 3: 1, 7: 7 };
  const horizon = horizonMap[period];

  try {
    const response = await axios.post(
      `${ML_SPACE_URL}/predict`,
      {
        base_currency,
        target_currency,
        horizon
      },
      { timeout: 15000 }
    );

    res.json(response.data);
  } catch (err) {
    console.error("Error contacting ML Space:", err.message);
    res.status(500).json({ error: "Gagal memanggil ML service" });
  }
});

module.exports = router;