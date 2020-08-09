const mongoose = require('mongoose')

const mongoURI = process.env.MONGODB_URI 

mongoose.connect(mongoURI,{useNewUrlParser: true, useCreateIndex:true, useUnifiedTopology: true}).catch(err=>console.log(err))

const db = mongoose.connection
db.once('open',()=>{
    console.log('Connected to DB')
})

