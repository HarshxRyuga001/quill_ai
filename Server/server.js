const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const contactRoute = require('./routes/contact');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(cors({
  origin: 'https://quill-go20diqzl-harshxryugas-projects.vercel.app',
  methods: ['GET', 'POST'],
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
