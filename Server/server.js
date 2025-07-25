const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const contactRoute = require('./routes/contact');
const cors = require('cors');

dotenv.config();
const app = express();

const allowedOrigins = [
  'https://quill-go20diqzl-harshxryugas-projects.vercel.app',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve frontend
app.use(express.static(path.join(__dirname, '../client')));

// Routes
app.use('/api/contact', contactRoute);

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));


app.listen(process.env.port, () => {
  console.log('Server running on http://localhost:3000');
});
