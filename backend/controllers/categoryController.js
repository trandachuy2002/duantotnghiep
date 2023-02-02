const Category = require('../models/Category.js');

// @desc Add new category
// @route POST '/api/category/add'
// @access Private : Admin
exports.addCategory = async (req, res) => {
  try {
    const category_data = await Category.find();
    if (category_data.length > 0) {
      let checkCategory = false;
      for (let i = 0; i < category_data.length; i++) {
        if (category_data[i]['title'] === req.body.title) {
          checkCategory = true;
          break;
        }
      };
      if (checkCategory == false) {
        const category = new Category({
          title: req.body.title
        })

        await category.save()
        res.status(200).json({ success: true, category })
      } else {
        res.status(400).json({ error: 'Danh mục đã tồn tại' })
      }

    } else {
      const category = new Category({
        title: req.body.title
      })

      await category.save()
      res.status(200).json({ success: true, category })
    }

  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

// @desc Get all category
// @route GET '/api/category/getAll'
// @access Public
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find()
    res.json({ success: true, categories })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

// @desc Get One category
// @route GET '/api/category/:id'
// @access Public
exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
    if (!category) {
      return res
        .status(404)
        .json({ success: false, error: 'Không tìm thấy danh mục' })
    }
    res.json({ success: true, category })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

// @desc Update Category
// @route PATCH '/api/category/:id'
// @access Private : Admin
exports.updateCategory = async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['title', 'image']
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  )
  if (!isValidOperation) {
    return res.status(400).json({ success: false, error: 'Cập nhật không hợp lệ' })
  }

  const category = await Category.findById(req.params.id)
  if (!category) {
    return res.status(404).json({ success: false, error: 'Không tìm thấy danh mục' })
  }

  updates.forEach(update => (category[update] = req.body[update]))
  try {
    await category.save()
    res.json({ success: true, message: 'Danh mục được cập nhật!', category })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

// @desc Delete a category
// @route DELETE  '/api/category/:id'
// @access Private : Admin
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
    if (!category) {
      return res
        .status(404)
        .json({ success: false, error: 'Không tìm thấy danh mục' })
    }

    await category.remove()
    res.json({ success: true, message: 'Đã xóa danh mục' })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}
