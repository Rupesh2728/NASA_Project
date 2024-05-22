const axios = require('axios');

const launchesDB = require('./launches.mongo')
const planetsDB = require('./planets.mongo');
const launchesMongo = require('./launches.mongo');

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
    {  
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
   const planet = await planetsDB.findOne({
      keplerName:launch.target,
  })
   if(!planet)
    {
       throw new Error("Could not find the planet")
    }

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

const SPACEX_API_URL = 'https://api.spacexdata.com/v4/launches/query';

const findLaunch =async (filter)=>{
  return await launchesMongo.findOne(filter);
}

const LoadLaunchData =async (req,res)=>{
  console.log('Downloading launch data...');
  const firstLaunch = await findLaunch({
   flightNumber : 1,
   rocket : 'Falcon 1',
   mission : 'FalconSat',
  });

  if(firstLaunch)
   {
      console.log("Launch Data already loaded!");
   }
   else
   {
      const response = await axios.post(SPACEX_API_URL,{
         query:{},
         options:{
            pagination : false,
            populate:[
             {
               path:'rocket',
               select:{
                  name: 1
               }
             },
             {
               path:'payloads',
               select:{
                  customers: 1
               }
             }]
         }
        })
        if(response.status!==200)
         {
            console.log('Problem downloading lauch data');
            throw new Error('Lauch data could not be downloaded!');
         }
        const launchDocs = response.data.docs;
        for(const launchDoc of launchDocs){
         const payloads = launchDoc['payloads'];
         const customers = payloads.flatMap((payload)=>{
            return payload['customers']; 
         });
         const launch = {
            flightNumber : launchDoc['flight_number'],
            mission : launchDoc['name'],
            rocket : launchDoc['rocket']['name'],
            launchDate : launchDoc['date_local'],
            customers: customers,
            upcoming : launchDoc['upcoming'],
            success : launchDoc['success'],
        }
      
        console.log(`${launch.flightNumber} ${launch.mission}`);
         await saveLaunch(launch);
      }

   }


  
}

module.exports = {
    getAllLaunches,
    addLaunch,
    existLaunch,
    AbortLaunchById,
    LoadLaunchData
}