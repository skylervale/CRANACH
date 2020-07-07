const express = require('express');
const router = express.Router({ mergeParams: true });
const paintingController = require('../controllers/painting.controller');

router.route('/')
    .get(paintingController.getAll);

module.exports = router;
