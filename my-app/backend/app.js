const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/my-to-list');

app.use('/api/auth', authRoutes);

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
