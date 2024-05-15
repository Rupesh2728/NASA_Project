const http = require("http");
const app = require('./app');
const {loadPlanetsData} = require("./models/planets.model")

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

const startServer=async ()=>{
    
    await loadPlanetsData();
    
    server.listen(PORT, (req,res)=>{
        console.log("Server listening on port " + PORT);
    })
    
}

startServer();


