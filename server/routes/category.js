const express = require('express')
const router = express.Router()

const Category = require('../models/category')
const Course = require('../models/course')

const { isAuth, userById, categoryById } = require('../middleware')

router.param('categoryId', categoryById)
router.param('userId', userById)

// Add a Category
//router.post('/category/create/:userId',  isAuth, (req, res) => {
router.post('/category/create',  isAuth, (req, res) => {
 const category = new Category(req.body);
 category.save((err, data) => {
  if (err) { return res.status(400).json({ error: "Failed to create category." })}
  res.json({ data })
 })
})

// Read Category
router.get('/category/:categoryId', (req, res) => { return res.json(req.category)})

// Update Category
router.put('/category/:categoryId/:userId', isAuth, (req, res) => {
 const category = req.category
 category.name = req.body.name
 category.save((err, data) => {
  if (err) { return res.status(400).json({ error: "Failed to update." })}
  res.json(data)
 })
})

// Delete Category
router.delete('/category/:categoryId/:userId', isAuth, (req, res) => {
 const category = req.category;
 Category.find({ category }).exec((err, data) => {
  if (data.length >= 1) { 
   return res.status(400).json({ message: `Sorry. You cant delete ${category.name}. It has ${data.length} associated categories.` })
  } 
  else { category.remove((err, data) => {
   if (err) { return res.status(400).json({ error: "Failed to delete." })}
   res.json({ message: 'Category deleted'})
  })}
 })
})

// Get all categories
router.get('/categories', (req, res) => {
 Category.find().exec((err, data) => { 
  if (err) { return res.status(400).json({ error: "error" })}
  res.json(data)
 })
})

module.exports = router