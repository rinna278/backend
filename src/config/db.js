
const mongoose = require('mongoose')

const connectDb=async ()=>{
    try {
        await mongoose.connect(process.env.MongoDbURL)
        console.log("connect to mongodb successfull");
    } catch (error) {
        console.log(error);
    }
}

module.exports={connectDb}