const mongoose = require('mongoose');

const urlMappingSchema = new mongoose.Schema({
  shortKey: String,
  originalUrl: String,
});

const UrlMapping = mongoose.model('UrlMapping', urlMappingSchema);

module.exports = UrlMapping;
