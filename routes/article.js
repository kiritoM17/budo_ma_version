var express = require('express');
var router = express.Router();
let articleController = require('./../controller/ArticleController');
cors = require('cors');
var corsOptions = {
    origin: '*'
  };
/* GET article page. */
//get route
router.get('/',articleController.index);
router.get('/getAllArticle',cors(corsOptions),articleController.sendAllToMobile);
router.get('/getAllArticleRubrique/:rubrique', cors(corsOptions),articleController.sendAllToMobileByRubrique);
router.get('/getAllArticleId/:id', cors(corsOptions),articleController.sendAllToMobileById);
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
