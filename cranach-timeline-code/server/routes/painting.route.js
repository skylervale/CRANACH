const express = require('express');
const router = express.Router({ mergeParams: true });
const paintingController = require('../controllers/painting.controller');

router.route('/')
    .get(paintingController.getAll);
router.route('/timeline')
    .get(paintingController.getTimelineList);
router.route('/search')
    .get(paintingController.FullTextSearch);
module.exports = router;
