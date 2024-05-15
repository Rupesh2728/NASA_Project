const {getAllPlanets} = require("../../models/planets.model")

const HttpgetAllPlanets = (req,res)=>{
   return res.status(200).json(getAllPlanets());
}

module.exports={
    HttpgetAllPlanets,
};