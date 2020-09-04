const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauces');


router.post('/api/sauces', auth, multer, sauceCtrl.createSauce);
router.post('/api/sauces/:id/like', auth, sauceCtrl.likeSauce);
router.put('/api/sauces/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/api/sauces/:id', auth, sauceCtrl.deleteSauce);
router.get('/api/sauces/:id', auth, sauceCtrl.findOneSauce);
router.use('/api/sauces', auth, sauceCtrl.findSauces);

module.exports = router;