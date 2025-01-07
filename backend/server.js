const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { protect, admin } = require('./middleware/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use(cors({
  origin: process.env.FRONTEND_ORIGIN,
  methods: ["POST", "GET", "PATCH", "DELETE"],
  credentials: true,
}));

app.use('/api/auth', authRoutes);

app.use('/api/books', (req, res, next) => {
  if (req.method === 'GET') {
    return next();
  }
  admin(req, res, next);
}, bookRoutes);

app.use('/api/users', protect, (req, res, next) => {
  if (req.method === 'GET') {
    return next();
  }
  admin(req, res, next);
}, userRoutes);

app.use('/api/transactions', transactionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
