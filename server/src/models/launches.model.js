const launches = new Map();
let lastflightnumber = 100;
const launch = {
    flightNumber : 100,
    mission : 'Kepler Exploration X',
    rocket : 'Explorer IS1',
    launchDate : new Date('December 27,2030'),
    target : 'Kepler-442 b',
    customer: ['ZTM','NASA'],
    upcoming : true,
    success : true,
}

launches.set(launch.flightNumber,launch);

const getAllLaunches = () =>
{
   return Array.from(launches.values())
}

const addLaunch =(launch)=>{
   lastflightnumber+=1;
   launches.set(lastflightnumber,Object.assign(launch,{
    flightNumber:lastflightnumber,
    upcoming : true,
    success : true,
    customer: ['Zero To Mastery','NASA'],
   }));
}

const existLaunch =(launchId)=>{
   return launches.has(launchId);
}

const AbortLaunchById = (launchId)=>{
   const aborted = launches.get(launchId);
   aborted.success = false;
   aborted.upcoming = false;
   return aborted;
}

module.exports = {
    getAllLaunches,
    addLaunch,
    existLaunch,
    AbortLaunchById,
}