// import express from 'express'
const express = require('express');

// import auth from '../middleware/auth.js'
// import checkAdmin from '../middleware/checkAdmin.js'
const { auth } = require('../middleware/auth.js');
const { checkAdmin } = require('../middleware/checkAdmin.js');

// import {
//     addBrand,
//     deleteBrand,
//     getAllBrands,
//     getBrand,
//     updateBrand,
// } from '../controllers/brandController.js'
const {
    addBrand,
    deleteBrand,
    getAllBrands,
    getBrand,
    updateBrand,
} = require('../controllers/brandController.js');

const router = express.Router()

// router.post('/add', addBrand)
router.route("/add").post(addBrand);

// router.get('/getAll', getAllBrands)
router.route("/getAll").get(getAllBrands);

// router.get('/:id', getBrand)
router.route("/:id").get(getBrand);

// router.patch('/:id', auth, checkAdmin, updateBrand)
router.route("/:id").patch(auth, checkAdmin, updateBrand);

// router.delete('/:id', auth, checkAdmin, deleteBrand)
router.route("/:id").delete(auth, checkAdmin, deleteBrand);

module.exports = router;
