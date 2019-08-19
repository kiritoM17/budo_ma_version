let multer= require('multer');
const fs = require('fs');
let path = require('path');
let passportHas=require('password-hash');
let PubliciteRepository = require('./../repository/PubliciteRepository');
let PubliciteR = new PubliciteRepository();
let PubliciteModel = require('./../models/Publicite');
let PubliciteController = {};
const storage = multer.diskStorage({
    destination: './public/imgages/publicite',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });
PubliciteController.addNewPublicite = (req,res)=>{
    let upload = multer({ storage: storage }).single('image_baniere');
    upload(req,res,(err)=>{
        if(err){
            res.send('error upload article');
        }else{
            if(req.files===undefined){
                res.send('error upload article');
            }else {
                //passwordHash.verify('actuel mdp', bdmdp)
                let Publicite = new PubliciteModel({
                    text_pub:req.body.text_pub,
                    link_pub:req.body.link_pub,
                    is_delete:false,
                    image_baniere:req.files
                });
                PubliciteR.save(Publicite);
                console.log(Publicite);
                console.log('photos save succefully!');
                return "ok save!";
            }

        }
    });
};

PubliciteController.modifierImageBaniere = (req,res)=>{
    let upload = multer({ storage: storage }).single('image_baniere');
    upload(req,res,(err)=>{
        if(err){
            res.send('error upload article');
        }else{
            if(req.files===undefined){
                res.send('error upload article');
            }else {
                PubliciteR.Modifier(req.body.id_Publicite,{image_baniere:req.files},cb);
                console.log('photos update!');
                return "ok save!";
            }

        }
    });
};

PubliciteController.modifierOthersInfos = (req,res)=>{

                PubliciteR.Modifier(req.body.id_Publicite,
                    {
                        text_pub:req.body.text_pub,
                        link_pub:req.body.link_pub
                    },
                    cb);
                console.log('photos update!');
                return "ok save!";
};


PubliciteController.desactiverPublicite = (req,res)=>{

                PubliciteR.Modifier(req.body.id_Publicite,
                    {
                        is_delete:false
                    },
                    cb);
                console.log('photos update!');
                return "ok save!";
};


module.exports=PubliciteController;