const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const contactRoute = require('./routes/contact');
const cors = require('cors');

app.use(cors({
  origin: 'https://quill-go20diqzl-harshxryugas-projects.vercel.app',
  methods: ['GET', 'POST'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();
const app = express();

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

const Port = 3000;
app.listen(Port, () => {
  console.log('Server running on http://localhost:3000');
});
