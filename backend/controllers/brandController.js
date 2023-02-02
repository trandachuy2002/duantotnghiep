const Brand = require('../models/Brand.js');

// @desc Add new category
// @route POST '/api/category/add'
// @access Private : Admin
exports.addBrand = async (req, res) => {
  try {
    const brand_data = await Brand.find();
    if (brand_data.length > 0) {
      let checkBrand = false;
      for (let i = 0; i < brand_data.length; i++) {
        if (brand_data[i]['local'] === req.body.local) {
          checkBrand = true;
          break;
        }
      };
      if (checkBrand == false) {
        const brand = new Brand({
          local: req.body.local
        })

        await brand.save()
        res.status(200).json({ success: true, brand })
      } else {
        res.status(400).json({ error: 'Thương hiệu đã tồn tại' })
      }

    } else {
      const brand = new Brand({
        local: req.body.local
      })

      await brand.save()
      res.status(200).json({ success: true, brand })
    }

  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

// @desc Get all category
// @route GET '/api/category/getAll'
// @access Public
exports.getAllBrands = async (req, res) => {
  try {
    const brands = await Brand.find()
    res.json({ success: true, brands })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

// @desc Get One category
// @route GET '/api/category/:id'
// @access Public
exports.getBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id)
    if (!brand) {
      return res
        .status(404)
        .json({ success: false, error: 'Không tìm thấy thương hiệu' })
    }
    res.json({ success: true, brand })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

// @desc Update Category
// @route PATCH '/api/category/:id'
// @access Private : Admin
exports.updateBrand = async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['local', 'image']
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  )
  if (!isValidOperation) {
    return res.status(400).json({ success: false, error: 'Cập nhật không hợp lệ' })
  }

  const brand = await Brand.findById(req.params.id)
  if (!brand) {
    return res.status(404).json({ success: false, error: 'Không tìm thấy thương hiệu' })
  }

  updates.forEach(update => (brand[update] = req.body[update]))
  try {
    await brand.save()
    res.json({ success: true, message: 'Thương hiệu được cập nhật!', brand })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

// @desc Delete a category
// @route DELETE  '/api/category/:id'
// @access Private : Admin
exports.deleteBrand = async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id)
    if (!brand) {
      return res
        .status(404)
        .json({ success: false, error: 'Không tìm thấy thương hiệu' })
    }

    await brand.remove()
    res.json({ success: true, message: 'Đã xóa thương hiệu' })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}
