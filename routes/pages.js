const express = require('express');
const { hCtrlFunction, cartCtrlFunction, kidsSCtrlFunction, 
    kidsCtrlFunction, menSCtrlFunction, menCtrlFunction, 
    womenSCtrlFunction, womenCtrlFunction, authenticateCtrlFunction, activateAccountCtrlFunction, checkouttCtrlFunction } = require('../controllers/pagesCtrlFile');

const router = express.Router();


router.get('/cart', cartCtrlFunction);
router.get('/kids-shoes', kidsSCtrlFunction);
router.get('/kids', kidsCtrlFunction);
router.get('/men-shoes', menSCtrlFunction);
router.get('/men', menCtrlFunction);
router.get('/women-shoes', womenSCtrlFunction);
router.get('/women', womenCtrlFunction);
router.get('/', hCtrlFunction);
router.get('/authenticate', authenticateCtrlFunction);
router.get('/activate-account', activateAccountCtrlFunction);
router.get('/checkout', checkouttCtrlFunction);

module.exports = router;