var express = require('express');
var router = express.Router();
let articleController = require('./../controller/ArticleController');

/* GET article page. */
//get route
router.get('/',articleController.index);
router.get('/getAllArticle',articleController.sendAllToMobile);
router.get('/getAllArticleRubrique/:rubrique',articleController.sendAllToMobileByRubrique);
//create route
router.post('/add',articleController.addArticle);
//update route
router.post('/addPubImageFirst',articleController.addPubImageFirst);
router.post('/addPubImageSecond',articleController.addPubImageSecond);
router.post('/updateCoverImage',articleController.addUpdateCoverImage);
router.post('/updateArticleInformation',articleController.addUpdateArticle);
//delete route
router.post('/deletePubImageFirst',articleController.deleteCorverPubImageFirst);
router.post('/deleteArticle',articleController.deletearticle);
router.post('/deletePubImageSecond',articleController.deleteCorverPubImageSecond);

module.exports = router;
