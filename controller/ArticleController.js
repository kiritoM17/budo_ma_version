
let multer= require('multer');

const fs = require('fs');

let path = require('path');

let ArticleRepository = require('./../repository/ArticleRepository');

let ArticleR = new ArticleRepository();

let ArticleModel = require('./../models/Article');

let articleController = {};

const storage = multer.diskStorage({
    destination: './public/assets/imgages/actualite',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

//return view article
articleController.index = (req,res)=>{
   ArticleR.affichertous().then((listArticle)=>{
       console.log(listArticle[0].titre);
       res.render('article',{articles:listArticle});
   }).catch((err)=>{
      // res.send(err);
       let listArticle = [];
       res.render('article',{articles:listArticle});
   });
};

//save article controller update
articleController.addArticle = (req,res)=>{
    //upload article  cover image
    let upload = multer({ storage: storage }).single('photo_couverture');
    upload(req,res,(err)=>{
        if(err){
            res.send('error upload article 1');
        }else{
            if(req.file===undefined){
                res.send('error upload article no image');
            }else {
                //build article object
                let article = new ArticleModel({
                    "rubrique":req.body.rubrique,
                    "titre":req.body.titre,
                    "statut":req.body.statut,
                    "descriptif":req.body.descriptif,
                    "text_1":req.body.text_1,
                    "text_2":req.body.text_2,
                    "text_3":req.body.text_3,
                    "date_publication":new Date(),
                    "date_creation":new Date(),
                    "autor":"budo",
                    "photo_couverture":req.file,
                    "image_pub_1":null,
                    "image_pub_2":null
                });
                //save article object on data base
                ArticleR.save(article);
                console.log('article save succefully!');
                //redirect article main view
                res.redirect('/article');
            }
        }
    });
};

//ajout  image a album
articleController.addAlbumFile=(req,res)=>{
    let upload = multer({ storage: storage }).array('album', 30);
    upload(req,res,(err)=>{
        if(err){
            res.send('error upload article');
        }else{
            if(req.files===undefined){
                res.send('error upload article');
            }else {
                ArticleR.Modifier(req.body.id_article,{"album": req.files}).then((result)=>{
                    console.log('album save succefully!');
                    res.redirect('/article');
                }).catch((err)=>{
                    console.log('erro ')
                    res.redirect('/article');
                });


            }

        }
    });
};

//update publicity first image
articleController.addPubImageFirst=(req,res)=>{
    let upload = multer({ storage: storage }).single('corver_pub_1');
    upload(req,res,(err)=>{
        if(err){
            res.send('error upload article  cover 1');
        }else{
            if(req.file===undefined){
                res.send('error upload article 1');
            }else {
                ArticleR.Modifier(req.body.id_article,{"image_pub_1": req.file}).then((result)=>{
                    console.log('album save succefully!');
                    res.redirect('/article');
                }).catch((err)=>{
                    console.log('erro ')
                    res.redirect('/article');
                });

            }
        }
    });
};
//update publicity second image
articleController.addPubImageSecond=(req,res)=>{
    let upload = multer({ storage: storage }).single('corver_pub_2');
    upload(req,res,(err)=>{
        if(err){
            res.send('error upload article  cover 2');
        }else{
            if(req.file===undefined){
                res.send('error upload article 2');
            }else {
                ArticleR.Modifier(req.body.id_article,{"image_pub_2": req.file}).then((result)=>{
                    console.log('album save succefully!');
                    res.redirect('/article');
                }).catch((err)=>{
                    console.log('erro ')
                    res.redirect('/article');
                });

            }
        }
    });
};
//update  article informations
articleController.addUpdateArticle=(req,res)=>{
    let article={
            "rubrique":req.body.rubrique,
            "titre":req.body.titre,
            "statut":req.body.statut,
            "descriptif":req.body.descriptif,
            "text_1":req.body.text_1,
            "text_2":req.body.text_2,
            "text_3":req.body.text_3,
            "date_publication":new Date()
        };
    ArticleR.Modifier(req.body.id_articles,article).then((result)=>{
        console.log('album save succefully!');
        res.redirect('/article');
    }).catch((err)=>{
        console.log('erro ')
        res.redirect('/article');
    });
        //res.redirect('/article');
};
//update covert article image
articleController.addUpdateCoverImage=(req,res)=>{
    let upload = multer({ storage: storage }).single('photo_couverture');
    upload(req,res,(err)=>{
        if(err){
            res.send('error upload article  cover 1');
        }else{
            if(req.file===undefined){
                res.send('error upload article 1');
            }else {
                ArticleR.Modifier(req.body.id_article,{"photo_couverture": req.file}).then((result)=>{
                    console.log('album save succefully!');
                    res.redirect('/article');
                }).catch((err)=>{
                    console.log('erro ')
                    res.redirect('/article');
                });

            }
        }
    });
};
//delete article
articleController.deletearticle=(req,res)=>{
    console.log('id=> ' +req.body.id_article);
    ArticleR.supprimerParId(req.body.id_article);
        res.redirect('/article');
};
//delte publicity corver image first
articleController.deleteCorverPubImageFirst=(req,res)=>{
    ArticleR.Modifier(req.body.id_article,{"image_pub_1": null}).then((result)=>{
        console.log('delete!');
        res.redirect('/article');
    }).catch((err)=>{
        console.log('erro ')
        res.redirect('/article');
    });
   /* fs.unlink(article.image_pub_1.path, (err) => {
        if (err) throw err;
        console.log('successfully deleted as '+article.image_pub_1.path);
    });*/
   // res.redirect('/article');
};
//delte publicity corver image second
articleController.deleteCorverPubImageSecond=(req,res)=>{
    console.log('id=> ' +req.body.id_article);
    ArticleR.Modifier(req.body.id_article,{"image_pub_2": null}).then((result)=>{
        console.log('delete!');
        res.redirect('/article');
    }).catch((err)=>{
        console.log('erro')
        res.redirect('/article');
    });
    /*fs.unlink(article.image_pub_1.path, (err) => {
        if (err) throw err;
        console.log('successfully deleted as '+article.image_pub_2.path);
    });*/
    //res.redirect('/article');
};
//find and returnarticle by id
articleController.findById = (req,res,id)=>{
  ArticleModel.findById(id).then((result)=>{
      result=JSON.stringify(result);
      result=JSON.parse(result);
      return result;
  })  .catch((err)=>{
     console.log('err');
     res.send(err);
  });
    res.redirect('/article');
};
articleController.sendAllToMobile=(req,res)=>{
  ArticleR.affichertous().then((result)=>{
      res.send(result);
  }).catch((err)=>{
      res.send({"statu":400,"articles":undefined});
  });
};
module.exports=articleController;
