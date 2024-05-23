const launchesModel = require("../../models/launches.model");
const { getPagination } = require("../../services/query");


const HttpgetAllLaunches=async (req,res)=>{
    console.log(req.query);
    const {skip,limit_per_page} = getPagination(req.query);
    const launches = await launchesModel.getAllLaunches(skip,limit_per_page);
    return res.status(200).json(launches);
}

const HttpAddnewLaunch=async (req,res)=>{
    const launch = req.body;
    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target)
    {
       return res.status(201).json({
        error : 'Missing required launch property'
       })
    }
    launch.launchDate = new Date(launch.launchDate);
    if(isNaN(launch.launchDate))
    {
        return res.status(400).json({
            error : 'Invalid launch date'
        })
    }


    await launchesModel.addLaunch(launch);
    return res.status(201).json(launch);
}


const HttpAbortLaunch = async (req,res)=>{
 const launchId = Number(req.params.id);
 const existLaunch = await launchesModel.existLaunch(launchId);
 if(existLaunch)
 {
    const aborted = await launchesModel.AbortLaunchById(launchId);
    if(!aborted)
    {
            return res.status(400).json({
                error:'Launch not aborted!!!',
            });
    }
    
     res.status(200).json({
        ok:true,
     });
 }

 else{
    return res.status(404).json({
        error: "Launch not found",
    });
 }
}

module.exports ={
    HttpgetAllLaunches,
    HttpAddnewLaunch,
    HttpAbortLaunch
}