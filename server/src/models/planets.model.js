const {parse} = require('csv-parse');
const fs=require('fs');
const path = require('path');

const planets = require('./planets.mongo');

const isHabitablePlanet=(planet)=>
{
   return planet['koi_disposition']==='CONFIRMED' && planet['koi_insol']>0.36 
   && planet['koi_insol']<1.11 && planet['koi_prad']<1.6;
}

const loadPlanetsData =()=>{
    return new Promise((resolve, reject)=>{
        fs.createReadStream(path.join(__dirname,'..','..','data','kepler_data.csv')).pipe(parse({
            comment : '#',
            columns : true,
        }))
        .on('data',async (data)=>{
            if(isHabitablePlanet(data))
            { 
               savePlanet(data);
            }
        }).on('error',(err)=>{
           console.log(err);
           reject(err);
        }).on('end',()=>{
            console.log("Data Loaded...Done!!!");
            resolve();
        })
    })
}

const getAllPlanets =async ()=>{
    return await planets.find({},{'keplerName':1});
}



const savePlanet = async (planet)=>{
   try{
    await planets.updateOne({
        keplerName: planet.kepler_name,
      },{
        keplerName : planet.kepler_name,
      },{
       upsert: true,
      })
   }
   catch(err){
      console.log("Could not save planet!!! "+err);
   }
}

module.exports={
    getAllPlanets,
    loadPlanetsData:loadPlanetsData
}