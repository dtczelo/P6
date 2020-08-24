const express = require('express');
const router = express.Router();

const Sauce = require('../models/sauce');
const sauceCtrl = require('../controllers/sauces');

router.post('/api/sauces', sauceCtrl.createSauce);
router.put('/api/sauces/:id', sauceCtrl.modifySauce);
router.delete('/api/sauces/:id', sauceCtrl.deleteSauce);
router.get('/api/sauces/:id', sauceCtrl.findOneSauce);
router.use('/api/sauces', sauceCtrl.findSauces);

module.exports = router;