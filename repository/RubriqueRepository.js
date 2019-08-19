const mongoose = require('mongoose');
class RubriqueRepository{
    constructor () { }
//fonction qui enregistrer 
    save(publicite) {
        console.log('saving projet in the repository" ' + projet);
        projet.save(function(mayHaveError) {
            cb(mayHaveError);
        });
    }
    //fonction qui retourne toutes les publicites
    affichertous() {
        return  mongoose.model('Publicite')
            .find()
            .limit(100)
            .exec();
    }
//return list of publicities with limit
    afficherAvecLimit(lm) {
        return mongoose.model('Publicite')
            .find()
            .limit(lm)
            .exec()
            .then((err,projet)=> console.log(projet));
    }
    //delete function by id
    supprimerParId(id) {
        mongoose.model('Publicite').findByIdAndDelete({_id : id}, cb).then((result)=>{
            console.log("suppression effectuée");
        }).catch((error)=>{
            console.log("erreur  suppression");
        });
    }
    //fonction qui modifie
    Modifier(id,update, cb) {
        mongoose.model('Publicite').findByIdAndUpdate(id,update,cb).then((result)=>{
            console.log("mise à jour effectuée");
        }).catch((error)=>{
            console.log("erreur  mise à jour effectuée");
        });
    }
}
module.exports = RubriqueRepository;