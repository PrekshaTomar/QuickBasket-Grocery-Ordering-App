const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // ✅ required name
  },
  price: {
    type: Number,
    required: true, // ✅ required price
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/100', // optional
  }
});

module.exports = mongoose.model('Product', productSchema);

