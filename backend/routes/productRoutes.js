const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); // ✅ MISSING in your code!
const Product = require('../models/Product');

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// POST add product
router.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ error: 'Error adding product' });
  }
});

// ✅ DELETE product by ID with validation
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  // ✅ Step 1: Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log("❌ Invalid ObjectId received:", id);
    return res.status(400).json({ error: 'Invalid product ID format' });
  }

  try {
    // ✅ Step 2: Attempt delete
    console.log("🔍 Deleting product with ID:", id);
    const deleted = await Product.findByIdAndDelete(id);

    if (!deleted) {
      console.log("⚠️ Product not found in DB for ID:", id);
      return res.status(404).json({ error: 'Product not found' });
    }

    console.log("✅ Product deleted:", deleted);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    console.error("❌ DELETE ERROR:", err);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

module.exports = router;




