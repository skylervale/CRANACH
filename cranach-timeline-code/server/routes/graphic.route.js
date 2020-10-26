const express = require('express');
const router = express.Router({ mergeParams: true });
const graphicController = require('../controllers/graphic.controller');

router.route('/')
    .get(graphicController.getAll);
router.route('/timeline')
    .get(graphicController.getTimelineList);
router.route('/search')
    .get(graphicController.FullTextSearch);
router.route('/getFilters')
    .get(graphicController.getFilterData);
module.exports = router;
