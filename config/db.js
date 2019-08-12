const mongoose = require('mongoose');
const db = require("../config/keys").mongoURI;

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true
        });

        console.log("MongoDB Connected")
    } catch(err){
        console.error(err.message);

        process.exit(1);
    }
}


module.exports = connectDB;