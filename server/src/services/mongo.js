const mongoose = require('mongoose');


const MONGO_URL = "mongodb+srv://rupeshp21:peddineni2728@nasacluster.jmilfps.mongodb.net/?retryWrites=true&w=majority&appName=NASACluster"

mongoose.connection.once('open',()=>{
    console.log('MongoDB connection is ready!!!');
});

mongoose.connection.on('error',(err)=>{
  console.log(err);
});

const MongoConnect = async ()=>{
    mongoose.connect(MONGO_URL);
}

const MongooseDisconnect = async ()=>{
    mongoose.disconnect();
}

module.exports = {
    MongoConnect,
    MongooseDisconnect
};
