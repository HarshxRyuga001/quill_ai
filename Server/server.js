const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const app = express();

// ✅ CORS fix: allow both localhost & Vercel frontend
const allowedOrigins = [
  'http://localhost:3000',
  /\.vercel\.app$/  // RegExp to allow all Vercel previews
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.some(o => typeof o === 'string' ? o === origin : o.test(origin))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
}));

// ✅ Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// ✅ Example contact route
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields required' });
  }

  // Save to DB (assuming Contact model is defined)
  try {
    // const newContact = new Contact({ name, email, message });
    // await newContact.save();
    res.json({ message: 'Message saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
