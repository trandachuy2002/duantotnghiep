const Product = require('../models/Product.js');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { errorHandler } = require('../middleware/errorMiddleware.js');

// @desc Add new product
// @route POST '/api/products/add'
// @access Private : Admin
exports.addProduct = async (req, res) => {
  try {
    // if (!req.body.name) {
    //   throw new Error('Bạn chưa nhập tên sản phẩm!')
    // }
    // if (!req.body.name) throw new Error('Xin vui lòng nhaapj ten')
    // if (!req.body.sku) throw new Error('Xin vui lòng max sp')
    // if (!req.body.name) throw new Error('Xin vui lòng nhaapj ten')
    // if (!req.body.category) throw new Error('Xin vui lòng chọn danh mục')
    // if (!req.body.brand) throw new Error('Xin vui lòng chọn thương hiệu')
    // if (!req.body.price) throw new Error('Xin vui lòng nhập giá')
    // if (!req.body.Stock) throw new Error('Xin vui lòng nhập số lượng')

    if (!req.file) throw new Error('Xin vui lòng tải ảnh lên')

    fs.access('uploads', err => {
      if (err) {
        fs.mkdirSync('/uploads')
      }
    })

    const product = new Product({
      ...req.body,
      image: `uploads/${req.file.originalname}`,
    })

    await sharp(req.file.buffer)
      .toFile(`uploads/${req.file.originalname}`)

    await product.save()
    res.status(201).json({ success: true, message: 'Thêm sản phẩm', product })
  } catch (err) {
    if (req.file) {
      fs.unlinkSync(
        path.resolve(`uploads/${req.file.originalname}`)
      )
    }
    res.status(400).json({ success: false, error: err.message })
  }
}

// @desc Get All products
// @route GET '/api/products/getAll'
// @access Public
// Allowed queryparams : category, keyword, limit, skip
exports.getAllProducts = async (req, res) => {
  try {
    let searchQuery = ''

    if (req.query.keyword) {
      searchQuery = String(req.query.keyword)
    }

    // for category filter
    if (req.query.category) {
      let categoryQuery = req.query.category
      const findQuery = {
        $and: [
          { category: categoryQuery },
          {
            $or: [
              { name: { $regex: searchQuery, $options: 'i' } }
            ],
          },
        ],
      }
      const results = await Product.find(findQuery)

      const products = await Product.find(findQuery)
        .sort('-createdAt')
        .populate('category', 'title')
        .limit(parseInt(req.query.limit))
        .skip(parseInt(req.query.skip))

      return res.json({ success: true, totalResults: results.length, products })
    }

    const findQuery = {
      $or: [
        { name: { $regex: searchQuery, $options: 'i' } }
      ],
    }

    const results = await Product.find(findQuery)

    const products = await Product.find(findQuery)
      .sort('-createdAt')
      .populate('category', 'title')
      .limit(parseInt(req.query.limit))
      .skip(parseInt(req.query.skip))
    return res.json({ success: true, totalResults: results.length, products })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

// @desc Get One product
// @route GET '/api/products/:id'
// @access Public
exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category', 'title').populate('brand', 'local')
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: 'Sản phẩm không có' })
    }
    res.json({ success: true, product })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

// @desc Update product details
// @route PATCH '/api/products/:id'
// @access Private : Admin
exports.updateProductDetails = async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name', 'sku', 'category', 'brand', 'price', 'description', 'Stock']
  const isValidOperation = updates.every(update =>
    allowedUpdates.includes(update)
  )
  if (!isValidOperation) {
    return res.status(400).json({ success: false, error: 'Cập nhật không hợp lệ' })
  }

  const product = await Product.findById(req.params.id)
  if (!product) {
    return res.status(404).json({ success: false, error: 'Sản phẩm không có' })
  }

  updates.forEach(update => (product[update] = req.body[update]))
  try {
    await product.save()
    res.json({ success: true, message: 'Sản phẩm được cập nhật!', product })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

// @desc Update prouduct image
// @route PATCH  '/api/products/:id/updateImage'
// @access Private : Admin
exports.updateProductImage = async (req, res) => {
  const date = new Date()
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: 'Sản phẩm không có' })
    }

    if (!req.file) throw new Error('xin vui lòng tải hình ảnh lên')
    fs.access('uploads', err => {
      if (err) {
        fs.mkdirSync('/uploads')
      }
    })
    fs.unlinkSync(path.resolve(product.image))

    await sharp(req.file.buffer)
      .resize({ width: 400, height: 400 })
      .toFile(`uploads/${req.file.originalname}`)

    product.image = `uploads/${req.file.originalname}`
    await product.save()
    res.json({ success: true, message: 'Hình ảnh được cập nhật', image: product.image })
  } catch (err) {
    if (req.file) {
      fs.unlinkSync(
        path.resolve(`uploads/${req.file.originalname}`)
      )
    }
    res.status(400).json({ success: false, error: err.message })
  }
}

// @desc Delete a product
// @route DELETE  '/api/products/:id'
// @access Private : Admin
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res
        .status(404)
        .json({ success: false, error: 'Sản phẩm không có' })
    }
    await product.remove()
    res.json({ success: true, message: 'Sản phẩm đã bị xóa' })
  } catch (err) {
    res.status(400).json({ success: false, error: err.message })
  }
}

exports.createProductReview = async (req, res, next) => {
  const { rating, comment, productId, user, name } = req.body
  const review = {
    user,
    name,
    rating: Number(rating),
    comment,
    productId
  };
  const product = await Product.findById(productId);
  const isReviewed = product.reviews.find(rev => rev.user === req.user?._id)
  if (isReviewed) {
    product.reviews.forEach(rev => {
      if (rev.user === req.user?._id)
        rev.rating = rating,
          rev.comment = comment,
          rev.name = name,
          rev.user = user,
          rev.productId = productId;
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length
  }
  let avg = 0;

  product.reviews.forEach(rev => {
    avg += rev.rating
  })
  product.ratings = avg / product.reviews.length;
  // vd: 1, 2, 3, 4 = 10 / 4 =2.5 *
  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
    review
  })
};
// Get All review of a Product
exports.getProductReviews = async (req, res, next) => {

  const product = await Product.findById(req.params.id);

  if (!product) {
    // return next(new ErrorHander("Product not found", 404));
    return res.status(404).json({ success: false, error: 'Sản phẩm không có' })
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
};
// Delete review
exports.deleteReview = async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new errorHandler("Sản phẩm không có", 404))
  }

  const reviews = product.reviews.filter(rev => rev._id.toString() !== req.query.id.toString());

  let avg = 0;

  reviews.forEach(rev => {
    avg += rev.rating
  })
  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }
  // vd: 1, 2, 3, 4 = 10 / 4 =2.5 *
  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(req.query.productId, {
    reviews,
    ratings,
    numOfReviews,
  }, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  })
  res.status(200).json({
    success: true,
  })
}