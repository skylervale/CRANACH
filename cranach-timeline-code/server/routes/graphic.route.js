const express = require('express');
const router = express.Router({ mergeParams: true });
const graphicController = require('../controllers/graphic.controller');

router.route('/')
    .get(graphicController.getAll);
router.route('/timeline')
    .get(graphicController.getTimelineList);
router.route('/search')
    .get(graphicController.FullTextSearch);
router.route('/classifications')
    .get(graphicController.getClassifications);
router.route('/medium')
    .get(graphicController.getMediumValues);
router.route('/artists')
    .get(graphicController.getArtistsList);
router.route('/locations')
    .get(graphicController.getLocationsList);
router.route('/repositories')
    .get(graphicController.getRepositoryValues);
router.route('/owners')
    .get(graphicController.getOwners);

module.exports = router;
