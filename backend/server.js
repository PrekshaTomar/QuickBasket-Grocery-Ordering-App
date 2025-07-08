const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // 👈 add this

const app = express();
app.use(cors());
app.use(express.json());

// 👇 paste your MongoDB connection string here
mongoose.connect('mongodb+srv://2023387520preksha:dtUV8vrUPH7TtkYz@cluster0.yx3olbi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.log("❌ DB Connection Error:", err));

// routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// server
app.listen(5000, () => console.log("🚀 Server running on port 5000"));

