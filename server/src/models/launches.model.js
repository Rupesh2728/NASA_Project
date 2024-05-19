const launchesDB = require('./launches.mongo')
const planetsDB = require('./planets.mongo');

let Default_flight_number = 100;
const launch = {
    flightNumber : 100,
    mission : 'Kepler Exploration X',
    rocket : 'Explorer IS1',
    launchDate : new Date('December 27,2030'),
    target : 'Kepler-442 b',
    customers: ["ZTM","NASA"],
    upcoming : true,
    success : true,
}

const saveLaunch=async (launch)=>
{
   try
    {  const planet = await planetsDB.findOne({
        keplerName:launch.target,
    })
     if(!planet)
      {
         throw new Error("Could not find the planet")
      }
      await launchesDB.updateOne({
         flightNumber: launch.flightNumber,
       },launch,{
        upsert : true,
       })
    }

    catch(err)
    {
       console.log(err);
    }
}

saveLaunch(launch);


const getAllLaunches = async () =>
{
   return launchesDB.find({},{
      '__v':0,
      '_id':0,
   })
}

const getlatestFlightNumber = async ()=>{
   const latestlaunch = await launchesDB.findOne().sort('-flightNumber');
   if(!latestlaunch)
      return Default_flight_number;

   return latestlaunch.flightNumber;
}

const addLaunch =async (launch)=>{
   const newflightnumber = await getlatestFlightNumber() + 1;
   const newLaunch = Object.assign(launch,{
      flightNumber:newflightnumber,
      upcoming : true,
      success : true,
      customer: ['Zero To Mastery','NASA'],
   });

   await saveLaunch(newLaunch);
}

const existLaunch =async (launchId)=>{
   return await launchesDB.findOne({
      flightNumber:launchId,
   });
}

const AbortLaunchById = async (launchId)=>{
  
   const aborted = await launchesDB.updateOne({
      flightNumber:launchId,
   },{
       upcoming:false,
       success:false,
   })

   return aborted.modifiedCount === 1;
}

module.exports = {
    getAllLaunches,
    addLaunch,
    existLaunch,
    AbortLaunchById,
}