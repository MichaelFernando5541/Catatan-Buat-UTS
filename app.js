import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import laptopRouter from './routes/laptopRoutes.js';

dotenv.config();

const app = express();
app.use(express.json());

// Koneksi Database MongoDB
const DB_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/michael_fernando_manajemen_data_laptop';
mongoose.connect(DB_URI)
  .then(() => console.log('Berhasil terhubung ke MongoDB'))
  .catch((err) => console.error('Koneksi MongoDB gagal:', err));

// Daftarkan Router Utama
app.use('/api/laptops', laptopRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});