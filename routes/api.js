const express = require("express");
const router = express.Router();
const supabase = require("../db/supabaseClient");
const axios = require("axios");

// GET: Fetch past conversions
router.get("/conversions", async (req, res) => {
  const { data, error } = await supabase.from("conversions").select("*");
  if (error) return res.status(500).json({ error });
  res.json(data);
});

// POST: Convert and store
router.post("/convert", async (req, res) => {
  const { amount, from, to } = req.body;

  try {
    const fixerRes = await axios.get("https://api.apilayer.com/fixer/convert", {
      params: { from, to, amount },
      headers: { apikey: process.env.FIXER_API_KEY },
    });

    const result = fixerRes.data.result;

    const { error } = await supabase.from("conversions").insert([
      {
        amount,
        from_currency: from,
        to_currency: to,
        converted_amount: result,
      },
    ]);

    if (error) return res.status(500).json({ error });
    res.json({ converted_amount: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
