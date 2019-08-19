let RubriqueRepository = require('./../repository/RubriqueRepository');
let RubriqueR = new RubriqueRepository();
let RubriqueModel = require('./../models/Rubrique');
let rubriqueController = {};
//add new rubrique
rubriqueController.addNewRubrique = (req,res)=>{
    let rubrique = new RubriqueModel({
        "titre":req.body.titre,
        "description":req.body.description
    });
    RubriqueR.save(rubrique);
    console.log('rubrique saved succefully!');
    res.redirect('/rubrique');
};
//update rubrique information
rubriqueController.updateRubrique = (req,res)=>{
    let rubrique = {
        "titre":req.body.titre,
        "description":req.body.description
    };
    RubriqueR.Modifier(req.body.id_Rubrique,rubrique);
    console.log('rubrique updated!');
    res.redirect('/rubrique');
};
//delete nubrique
rubriqueController.deleteRubrique = (req,res)=>{
    RubriqueR.supprimerParId(req.body.id_Rubrique);
    console.log('rubrique deleted!');
    res.redirect('/rubrique');
};
//get all rubrique
rubriqueController.deleteRubrique = (req,res)=>{
    RubriqueR.affichertous().then((result)=>{
        res.send(result);
    }).catch((err)=>{
       res.send(404);

    });
};
module.exports=rubriqueController;