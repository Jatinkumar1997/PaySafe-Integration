const express = require('express')
const logger = require('morgan')
const path = require('path')
const UserService = require('./services/userService')
const PaymentService = require('./services/paymentService')
const auth = require('./middleware/auth')
require('./db/mongoDb')

const port = process.env.PORT || 8080

const app = express()
app.use(express.json())
app.use(logger('tiny')) 

app.post('/user/register',async (req,res)=>{
    const response = await new UserService().createUser(req)
    if(response.user){
        res.status(201).send(response)
    }
    else{
        res.status(400).send("BAD REQUEST")
    }
})

app.get('/user/:id',auth,async (req,res)=>{
    const response = await new UserService().getUser(req)
    if(response.error){
        res.status(404).send(response)
    }
    res.status(200).send(response)
})

app.post('/user/singleUseCustomerToken',auth,async (req,res)=>{
    const response = await new UserService().getSingleUseCustomerToken(req)
    if(response.error){
        res.status(404).send(response)
    }
    res.status(200).send(response)
})

app.post('/user/login', async (req, res) => {
    const response = await new UserService().loginUser(req)
    if(response.user){
        res.status(200).send(response)
    }
    else if(response.error){
        res.status(200).send(response)
    }
    else{
        res.status(400).send({error:"Bad Request"})
    }
})

app.post('/makePayment',auth,async (req,res)=>{
    const response = await new PaymentService().makePayment(req)
    console.log(response)
    if(response==='Success'){
        res.status(200).send(response)
    }
    else res.status(505).send(response)
})

if(process.env.NODE_ENV ==='production'){
    app.use(express.static('client/build'))

    app.get('*',(req,res)=>{
        res.sendfile(path.resolve(__dirname,'client','build','index.html'))
    })
} 

app.listen(port,()=>{
    console.log(`Server is up at:${port}`)
})