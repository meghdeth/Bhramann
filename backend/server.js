import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import packageRoutes from './routes/packages.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/packages', packageRoutes);

const PORT = process.env.PORT || 5000;
app.use((err, req, res, next) => {
    console.error('🛑 Server Error:', err.stack);          // logs the full stack
    const status = err.statusCode || 500;
    res.status(status).json({ message: err.message });
  });
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
