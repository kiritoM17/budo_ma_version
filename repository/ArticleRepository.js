const mongoose = require('mongoose');
class ArticleRepository{
    constructor () { }
//fonction qui enregistrer 
    save(projet) {
        console.log('saving projet in the repository" ' + projet);
        projet.save(function(mayHaveError) {
            cb(mayHaveError);
        });
     }
     //fonction qui recherche tous les article en fonction de la rubrique
     async afficherParRubrique(rubrique) {
        let result =await  mongoose.model('Article')
           .find({ rubrique: rubrique})
           .exec();
        console.log(result);
        return result;
     }
     //afficher par id
     async afficherParId(id) {
        let result =await  mongoose.model('Article')
           .findById(id)
           .exec();
        console.log(result);
        return result;
     }
     //fonction qui retourne tous les projets
    async affichertous() {
       let result =await  mongoose.model('Article')
          .find()
          .limit(100)
          .exec();
       console.log(result);
       return result;
    }
//return list of project with limit
afficherAvecLimit(lm) {
        return mongoose.model('Article')
          .find()
          .limit(lm)
          .exec()
          .then((err,projet)=> console.log(projet));
    }
    //delete function by id
    supprimerParId(id) {
        console.log(id + " <=id ");
        mongoose.model('Article').deleteOne({"_id" : id}).then((result)=>{
            console.log('ok deleted');
        }).catch((err)=>{
            console.log(err);
        });
     }
 //fonction qui modifie
 Modifier(id,update) {
    return mongoose.model('Article').findByIdAndUpdate(id,update);
 }
    //fonction qui supprimer
    update(id,update) {
        mongoose.model('Article').updateOne({"_id":id},{$set:update},function(err, res) {
            if (err) throw err;
            console.log("1 document updated");
        });
    }
}
module.exports = ArticleRepository;
