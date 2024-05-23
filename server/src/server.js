const http = require("http");
const app = require('./app');
const mongoose = require("mongoose");
require('dotenv').config();

const {loadPlanetsData} = require("./models/planets.model");

const {MongoConnect} = require('./services/mongo');
const { LoadLaunchData } = require("./models/launches.model");

const PORT = process.env.PORT || 8000;


const server = http.createServer(app);


const startServer=async ()=>{
    await MongoConnect();

    await loadPlanetsData();

    await LoadLaunchData();
    
    server.listen(PORT, (req,res)=>{
        console.log("Server listening on port " + PORT);
    })
    
}

startServer();



