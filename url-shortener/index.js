const express = require('express');
const app = express();
const mongoose = require('mongoose');
const shortid = require('short-id');
const UrlMapping = require('./models/urlMapping');

app.use(express.json({ extended: false }));

const PORT = 5000;

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:1000/links', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Route to handle URL mapping creation
app.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;

  // Generate a short key using shortid
  const shortKey = shortid.generate();

  // Create a new URL mapping document
  const newUrlMapping = new UrlMapping({
    shortKey: shortKey,
    originalUrl: longUrl,
  });

  try {
    const savedUrlMapping = await newUrlMapping.save();
    res.json(savedUrlMapping);
  } catch (error) {
    console.error(error);
    res.status(500).json('Server Error');
  }
});

// Route to get the mapped long key
app.get('/:shortKey', async (req, res) => {
    const { shortKey } = req.params;
  
    try {
      const urlMapping = await UrlMapping.findOne({ shortKey });
      if (urlMapping) {
        // Redirect to the original URL
        res.redirect(urlMapping.originalUrl);
      } else {
        // Handle when the short key is not found
        res.status(404).send('Short key not found');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });
  

app.listen(PORT, () => console.log('app is running'));
