const mongoose = require('mongoose');

class UserRepository{
<<<<<<< HEAD
//constructor
    constructor () { }
=======

//constructor
    constructor () { }

>>>>>>> 4037f5ef79359f938f80aa454bf2172e13c8759b
    save(user, cb) {
        console.log('saving user in the repository" ' + user);
        user.save(function(mayHaveError){
            cb(mayHaveError);
        });
    }
<<<<<<< HEAD
    //find user by email and password
    rechercherParEmail(title,cb) {
        console.log('finding Userby email: ' + email);
        return mongoose.model('User').find({"email":email}, cb);
=======

    //find user by email and password
    rechercherParEmail(title,pass, cb) {
        console.log('finding Userby email: ' + email);
        mongoose.model('User').find({"email":title,"password":pass}, cb);
>>>>>>> 4037f5ef79359f938f80aa454bf2172e13c8759b
    }

//update user 
Modifier(id,update, cb) {
        

    mongoose.model('User').findByIdAndUpdate(id,update,cb).then((result)=>{

        console.log("mise à jour effectuée");
        
    }).catch((error)=>{

        console.log("erreur  mise à jour effectuée");

    });

}
}
module.exports = UserRepository;
