export const validateLaptop = (req, res, next) => {
  const { merk_laptop, processor, harga } = req.body;
  
  if (!merk_laptop || !processor || harga === undefined) {
    return res.status(400).json({
      success: false,
      message: 'Field merk_laptop, processor, dan harga wajib diisi lengkap.'
    });
  }

  if (typeof harga !== 'number' || harga < 0) {
    return res.status(400).json({
      success: false,
      message: 'Format harga harus berupa angka dan bernilai positif.'
    });
  }

  next();
};