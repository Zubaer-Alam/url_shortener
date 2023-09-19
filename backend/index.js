const express = require("express");
const app = express();
const mongoose = require("mongoose");
const shortid = require("short-id");
const UrlMapping = require("./models/urlMapping");
const cors = require("cors");

app.use(cors());
app.use(express.json({ extended: false }));

const PORT = 8000;

// Connect to MongoDB
mongoose
  .connect("mongodb://mongodb:27017/links", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

  // POST
app.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;
  const shortKey = shortid.generate();

  const originalUrl = longUrl.startsWith('http') ? longUrl : `http://${longUrl}`;

  const newUrlMapping = new UrlMapping({
    shortKey: shortKey,
    originalUrl: originalUrl,
  });

  try {
    const savedUrlMapping = await newUrlMapping.save();
    res.json(savedUrlMapping);
  } catch (error) {
    console.error(error);
    res.status(500).json('Server Error');
  }
});

// GET
app.get("/:shortKey", async (req, res) => {
  const { shortKey } = req.params;

  try {
    const urlMapping = await UrlMapping.findOne({ shortKey });

    if (urlMapping) {
      res.redirect(urlMapping.originalUrl);
    } else {
      res.status(404).send("Short key not found");
    }

  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

app.listen(PORT, () => console.log("app is running"));
