const express = require('express');
const graphics = require('./graphic.route');
const paintings = require('./painting.route');

const router = express.Router();

router.use('/graphics', graphics);
router.use('/painting', paintings);

module.exports = router;
