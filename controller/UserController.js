let multer= require('multer');
const fs = require('fs');
let path = require('path');
let passportHas=require('password-hash');
let UserRepository = require('./../repository/UserRepository');
let UserR = new UserRepository();
let UserModel = require('./../models/User');
let userController = {};
const storage = multer.diskStorage({
    destination: './public/imgages/users',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

userController.addNewUser = (req,res)=>{
    let upload = multer({ storage: storage }).single('photo_profil');
    upload(req,res,(err)=>{
        if(err){
            res.send('error upload article');
        }else{
            if(req.files===undefined){
                res.send('error upload article');
            }else {
                //passwordHash.verify('actuel mdp', bdmdp)
                let user = new UserModel({
                    nom:req.body.nom,
                    prenom:req.body.prenom,
                    tel:req.body.tel,
                    email:req.body.email,
                    password:passportHas.generate(req.body.password),
                    photo_profil:req.files
                });
                UserR.save(user);
                console.log(user);
                console.log('photos save succefully!');
                return "ok save!";
            }

        }
    });
};

userController.modifierPhotoProfil = (req,res)=>{
    let upload = multer({ storage: storage }).single('photo_profil');
    upload(req,res,(err)=>{
        if(err){
            res.send('error upload article');
        }else{
            if(req.files===undefined){
                res.send('error upload article');
            }else {
                UserR.Modifier(req.body.id_user,{photo_profil:req.files},cb);
                console.log('photos update!');
                return "ok save!";
            }

        }
    });
}

userController.authentification = (req,res)=>{
    let user = UserR.rechercherParEmail(req.body.email);
    if(passportHas.verify(req.body.password,user.password))
    {
        //initialisation de la session et reourne la vue
    }else{
        //rediriger sur la page avec un message d'erreur

    }
};

userController.modifierOthersInfos = (req,res)=>{

                UserR.Modifier(req.body.id_user,
                    {
                    nom:req.body.nom,
                    prenom:req.body.prenom,
                    tel:req.body.tel,
                    email:req.body.email,
                    password:passportHas.generate(req.body.password)
                    },
                    cb);
                console.log('photos update!');
                return "ok save!";
};

module.exports=userController;