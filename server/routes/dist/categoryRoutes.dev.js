"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../controllers/categoryController'),
    create = _require.create,
    categoryById = _require.categoryById,
    read = _require.read,
    update = _require.update,
    remove = _require.remove,
    list = _require.list;

var _require2 = require('../middleware/indexMiddleware'),
    requireSignin = _require2.requireSignin,
    isAuth = _require2.isAuth,
    userById = _require2.userById;

router.get('/category/:categoryId', read);
router.post('/category/create/:userId', requireSignin, isAuth, create);
router.put('/category/:categoryId/:userId', requireSignin, isAuth, update);
router["delete"]('/category/:categoryId/:userId', requireSignin, isAuth, remove);
router.get('/categories', list);
router.param('categoryId', categoryById);
router.param('userId', userById);
module.exports = router;