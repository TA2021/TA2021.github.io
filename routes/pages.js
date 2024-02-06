const express = require('express');
//const { modules } = require('node:module');
const { hCtrlFunction, cartCtrlFunction, kidsSCtrlFunction, kidsCtrlFunction, menSCtrlFunction, menCtrlFunction, womenSCtrlFunction, womenCtrlFunction } = require('../controllers/pagesCtrlFile');

const router = express.Router();

router.get('/', hCtrlFunction);
router.get('/cart', cartCtrlFunction);
router.get('/kids-shoes', kidsSCtrlFunction);
router.get('/kids', kidsCtrlFunction);
router.get('/men-shoes', menSCtrlFunction);
router.get('/men', menCtrlFunction);
router.get('/women-shoes', womenSCtrlFunction);
router.get('/women', womenCtrlFunction);

module.exports = router;