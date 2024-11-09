const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
