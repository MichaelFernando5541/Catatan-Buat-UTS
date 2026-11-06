import express from 'express';
import Laptop from '../models/laptopModel.js';
import { validateLaptop } from '../middlewares/validateMiddleware.js';

const router = express.Router();

// GET ALL (Dengan Fitur Filter & Sorting)
router.get('/', async (req, res) => {
  try {
    const { merk_laptop, processor, sortBy, order } = req.query;
    let query = {};

    if (merk_laptop) {
      query.merk_laptop = { $regex: merk_laptop, $options: 'i' };
    }
    if (processor) {
      query.processor = { $regex: processor, $options: 'i' };
    }

    let laptopsQuery = Laptop.find(query);

    if (sortBy) {
      const sortOrder = order === 'desc' ? -1 : 1;
      laptopsQuery = laptopsQuery.sort({ [sortBy]: sortOrder });
    }

    const laptops = await laptopsQuery;
    res.status(200).json({
      success: true,
      count: laptops.length,
      data: laptops
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET BY ID
router.get('/:id', async (req, res) => {
  try {
    const laptop = await Laptop.findById(req.params.id);
    if (!laptop) {
      return res.status(404).json({ success: false, message: 'Data laptop tidak ditemukan' });
    }
    res.status(200).json({ success: true, data: laptop });
  } catch (error) {
    res.status(400).json({ success: false, message: 'ID MongoDB tidak valid' });
  }
});

// POST (Tambah Data)
router.post('/', validateLaptop, async (req, res) => {
  try {
    const newLaptop = new Laptop(req.body);
    const savedLaptop = await newLaptop.save();
    res.status(201).json({ success: true, data: savedLaptop });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// PUT (Update Data)
router.put('/:id', validateLaptop, async (req, res) => {
  try {
    const updatedLaptop = await Laptop.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedLaptop) {
      return res.status(404).json({ success: false, message: 'Data laptop tidak ditemukan' });
    }
    res.status(200).json({ success: true, data: updatedLaptop });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE (Hapus Data)
router.delete('/:id', async (req, res) => {
  try {
    const deletedLaptop = await Laptop.findByIdAndDelete(req.params.id);
    if (!deletedLaptop) {
      return res.status(404).json({ success: false, message: 'Data laptop tidak ditemukan' });
    }
    res.status(200).json({ success: true, message: 'Data laptop berhasil dihapus' });
  } catch (error) {
    res.status(400).json({ success: false, message: 'ID MongoDB tidak valid' });
  }
});

export default router;