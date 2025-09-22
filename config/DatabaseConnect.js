const mongoose = require('mongoose');
const DB_Url = process.env.DB_URL;

mongoose.connect( DB_Url,{})
    .then(()=>{
        console.log('Database is connected');
    }).catch(()=>{
        console.log('Database connection failed');
    });