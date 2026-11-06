import mongoose from 'mongoose';

const laptopSchema = new mongoose.Schema({
  merk_laptop: {
    type: String,
    required: [true, 'Merk laptop wajib diisi'],
    trim: true
  },
  processor: {
    type: String,
    required: [true, 'Processor wajib diisi'],
    trim: true
  },
  harga: {
    type: Number,
    required: [true, 'Harga wajib diisi'],
    min: [0, 'Harga tidak boleh negatif']
  }
}, {
  timestamps: true,
  collection: 'laptops'
});

export default mongoose.model('Laptop', laptopSchema);