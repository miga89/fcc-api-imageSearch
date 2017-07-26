const express = require('express');
const imageController = require('../controllers/imageController');

const router = express.Router();
// what about catch errors?
router.get('/',imageController.homepage);
router.get('/api/imagesearch/:searchTerms(*)',imageController.getImageSearch);
router.get('/api/latest/imagesearch/',imageController.getSearchList);


module.exports = router;
