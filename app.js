const express = require('express')
const fetch = require('node-fetch')
const logger = require('morgan')
const path = require('path')
const User = require('./models/user')
const URIs = require('./config/paysafeURIs')
require('./db/mongoDb')

const port = process.env.PORT || 8080

const app = express()
app.use(express.json())
app.use(logger('tiny'))
var headers = {
    "Content-Type": "application/json",
    "Authorization": "Basic "+ process.env.PAYSAFE_API,
    "Simulator": "EXTERNAL"
}

app.post('/user/register',async (req,res)=>{

    const user = new User(req.body.user)
    try{
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    }
    catch(e){
        res.status(400).send(e)
    }
})

app.get('/user/:id',async (req,res)=>{
    const usr = await User.findById(req.params.id)
    if(!usr){
        res.status(404).json({'error':'User Not Found'})
    }
    res.status(200).send(usr)
})

app.get('/user/:id/singleUseCustomerToken',async (req,res)=>{
    const usr = await User.findById(req.params.id)
    if(!usr){
        res.status(404).send("User Not Found")
    }
    if(usr.customerToken){
        var reqUrl = `${URIs.customersURI}/${usr.customerToken}/singleusecustomertokens`
        var reqData = {
            "merchantRefNum": usr.merchRefs[0],
            "paymentTypes": [
              "CARD"
            ]
        }
        fetch(reqUrl,{method:'POST',headers:headers,body:JSON.stringify(reqData)})
        .then(res=>res.json()).then((data)=>{
            res.status(200).json({"singleUseCustomerToken":data.singleUseCustomerToken})
        })
        .catch(e=>console.error(e))
    }
    else res.status(200).json({"singleUseCustomerToken":""})
})

app.post('/makePayment',async (req,res,next)=>{
    var amount = req.body.amount
    var token = req.body.paymentHandleToken.toString()
    var operation = req.body.customerOperation
    var userId = req.body.userId
    var merchRefNum = req.body.merchRefNum
    
    if(operation === 'ADD'){
        var fetchUser = await User.findById(userId)
        fetchUser.merchRefs = fetchUser.merchRefs.concat({ merchRefNum })
        fetchUser.save()
        if(!fetchUser.customerToken){
            var customerData = {
                "merchantCustomerId": "12345678",
                "locale": "en_US",
                "firstName": fetchUser.firstName,
                "lastName": fetchUser.lastName,
                "dateOfBirth": {
                  "year": fetchUser.DOB_year,
                  "month": fetchUser.DOB_month,
                  "day": fetchUser.DOB_day
                },
                "email": fetchUser.email,
                "phone": fetchUser.phoneNumber
              }
            var customerUrl = URIs.customersURI
            fetch(customerUrl,{method:'POST',headers:headers,body:JSON.stringify(customerData)})
            .then(res=>res.json()).then((d)=> {
                fetchUser.customerToken = d.id
                fetchUser.save()
                var url = URIs.paymentsURI

                var data = {
                    "merchantRefNum":merchRefNum,
                    "customerId":fetchUser.customerToken,
                    "amount":amount,
                    "currencyCode":"USD",
                    "dupCheck":true,
                    "settleWithAuth":true,
                    "paymentHandleToken":token
                }
                fetch(url,{method:'POST',headers:headers,body:JSON.stringify(data)})
                .then(res=>res.json()).then(data=>{
                    if(!data.error){
                        res.status(200).send('Success')
                    }
                    else{
                        res.status(400)
                    }
                })
                .catch(er=>console.error(er))
            })
            .catch(er=>console.error(er))
        }
        else{
            var url = URIs.paymentsURI
    
            var data = {
                "merchantRefNum":merchRefNum,
                "customerId":fetchUser.customerToken,
                "amount":amount,
                "currencyCode":"USD",
                "dupCheck":true,
                "settleWithAuth":true,
                "paymentHandleToken":token
            }
            fetch(url,{method:'POST',headers:headers,body:JSON.stringify(data)})
            .then(res=>res.json()).then(data=>{
                if(!data.error){
                    res.status(200).send('Success')
                }
                else{
                    res.status(400)
                }
            })
            .catch(er=>console.error(er))
        }
    }
    else{
        var url = URIs.paymentsURI
    
            var data = {
                "merchantRefNum":merchRefNum,
                "amount":amount,
                "currencyCode":"USD",
                "dupCheck":true,
                "settleWithAuth":true,
                "paymentHandleToken":token
            }
            fetch(url,{method:'POST',headers:headers,body:JSON.stringify(data)})
            .then(res=>res.json()).then(data=>{
                if(!data.error){
                    res.status(200).send('Success')
                }
                else{
                    res.status(400)
                }
            })
            .catch(er=>console.error(er))
    }
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