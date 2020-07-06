const express = require('express');
const router = express.Router({ mergeParams: true });
const graphicController = require('../controllers/graphic.controller');

router.route('/')
    .get(graphicController.getAll);

module.exports = router;
