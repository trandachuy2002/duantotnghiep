// import express from "express";
// import auth from "../middleware/auth.js";
// import checkAdmin from "../middleware/checkAdmin.js";
const express = require('express');
const { auth } = require('../middleware/auth.js');
const { checkAdmin } = require('../middleware/checkAdmin.js');
// import {
//   addCategory,
//   deleteCategory,
//   getAllCategories,
//   getCategory,
//   updateCategory,
// } from "../controllers/categoryController.js";
const {
  addCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
  updateCategory,
} = require('../controllers/categoryController.js');

const router = express.Router();

// router.post("/add", addCategory);
router.route("/add").post(addCategory);

// router.get("/getAll", getAllCategories);
router.route("/getAll").get(getAllCategories);

// router.get("/:id", getCategory);
router.route("/:id").get(getCategory);

// router.patch("/:id", auth, checkAdmin, updateCategory);
router.route("/:id").patch(auth, checkAdmin, updateCategory);

// router.delete("/:id", auth, checkAdmin, deleteCategory);
router.route("/:id").delete(auth, checkAdmin, deleteCategory);

module.exports = router;
