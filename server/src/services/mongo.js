const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URL = process.env.MONGO_URL;

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
