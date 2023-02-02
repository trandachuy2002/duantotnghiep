// import express from 'express'
// import {
//   addProduct,
//   createProductReview,
//   deleteProduct,
//   deleteReview,
//   getAllProducts,
//   getProduct,
//   getProductReviews,
//   updateProductDetails,
//   updateProductImage,
// } from '../controllers/productController.js'
// import auth from '../middleware/auth.js'
// import checkAdmin from '../middleware/checkAdmin.js'
// import upload from '../middleware/multer.js'

const express = require('express');
const { auth } = require('../middleware/auth.js');
const { checkAdmin } = require('../middleware/checkAdmin.js');
const upload = require('../middleware/multer.js');

const {
  addProduct,
  createProductReview,
  deleteProduct,
  deleteReview,
  getAllProducts,
  getProduct,
  getProductReviews,
  updateProductDetails,
  updateProductImage,
} = require('../controllers/productController.js');




const router = express.Router()

// router.post('/add', upload.single('image'), addProduct)
router.route("/add").post(upload.single('image'), addProduct);

// router.get('/getAll', getAllProducts)

router.route("/getAll").get(getAllProducts);

// router.get('/:id', getProduct)
router.route("/:id").get(getProduct);

// router.patch('/:id', updateProductDetails)
router.route("/:id").patch(updateProductDetails);

// router.patch(
//   '/:id/updateImage',
//   auth,
//   checkAdmin,
//   upload.single('image'),
//   updateProductImage
// )
router.route("/:id/updateImage").patch(auth,
  checkAdmin,
  upload.single('image'),
  updateProductImage);

// router.delete('/:id', deleteProduct)
router.route("/:id").delete(deleteProduct);

// router.put("/review", createProductReview);
router.route("/review").put(createProductReview);

// router.get("/reviews/:id", getProductReviews);
router.route("/reviews/:id").get(getProductReviews);

// router.delete("/reviews", deleteReview);
router.route("/reviews").delete(deleteReview);

module.exports = router;
