const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // ✅ Load environment variables from .env

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ DB Connection Error:", err));

// Routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


