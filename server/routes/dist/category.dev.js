"use strict";

var express = require('express');

var router = express.Router();

var Category = require('../models/category');

var Course = require('../models/course');

var _require = require('../middleware'),
    isAuth = _require.isAuth,
    userById = _require.userById,
    categoryById = _require.categoryById;

router.param('categoryId', categoryById);
router.param('userId', userById); // Add a Category
//router.post('/category/create/:userId',  isAuth, (req, res) => {

router.post('/category/create', isAuth, function (req, res) {
  var category = new Category(req.body);
  category.save(function (err, data) {
    if (err) {
      return res.status(400).json({
        error: "Failed to create category."
      });
    }

    res.json({
      data: data
    });
  });
}); // Read Category

router.get('/category/:categoryId', function (req, res) {
  return res.json(req.category);
}); // Update Category

router.put('/category/:categoryId/:userId', isAuth, function (req, res) {
  var category = req.category;
  category.name = req.body.name;
  category.save(function (err, data) {
    if (err) {
      return res.status(400).json({
        error: "Failed to update."
      });
    }

    res.json(data);
  });
}); // Delete Category

router["delete"]('/category/:categoryId/:userId', isAuth, function (req, res) {
  var category = req.category;
  Category.find({
    category: category
  }).exec(function (err, data) {
    if (data.length >= 1) {
      return res.status(400).json({
        message: "Sorry. You cant delete ".concat(category.name, ". It has ").concat(data.length, " associated categories.")
      });
    } else {
      category.remove(function (err, data) {
        if (err) {
          return res.status(400).json({
            error: "Failed to delete."
          });
        }

        res.json({
          message: 'Category deleted'
        });
      });
    }
  });
}); // Get all categories

router.get('/categories', function (req, res) {
  Category.find().exec(function (err, data) {
    if (err) {
      return res.status(400).json({
        error: "error"
      });
    }

    res.json(data);
  });
});
module.exports = router;