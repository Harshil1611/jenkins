const mongoose = require('mongoose')

//Establishing Connection

const connection = () => {
    mongoose.connect(process.env.MONGO_DB)
    .then(()=>{
        
        console.log("Connected Successfully with database");
    })
    .catch((err)=>{
        console.log(err);
    })
    
}


//handle connection events to know when the 
//connection is open, closed, or if there’s an error
mongoose.connection.on('connected',()=>{
    console.log("Connected Successfully");
})
mongoose.connection.on('error',(err)=>{
    console.log("Not Connected Successfully");
})
mongoose.connection.on('disconnected',()=>{
    console.log("Disconnected Successfully");
})


//application exits or no longer needs the database connection
//remember to close
process.on('SIGINT', async() => {
    await mongoose.connection.close()
    console.log("Mongoose connection is disconnected from terminal");
    process.exit(0)
});


module.exports = connection