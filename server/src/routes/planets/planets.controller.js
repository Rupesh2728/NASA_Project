const {getAllPlanets} = require("../../models/planets.model")

const HttpgetAllPlanets = async (req,res)=>{
    return res.status(200).json(await getAllPlanets());
}

module.exports={
    HttpgetAllPlanets,
};