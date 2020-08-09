const User = require('../models/user')
const PaySafe = require('../config/paysafeURIs')
const { default: Axios } = require('axios')

class UserService{

    async createUser(req){
        const user = new User(req.body.user)
        try{
            await user.save()
            const token = await user.generateAuthToken()
            var customerData = {
                "merchantCustomerId": user._id,
                "locale": "en_US",
                "firstName": user.firstName,
                "lastName": user.lastName,
                "dateOfBirth": {
                "year": user.DOB_year,
                "month": user.DOB_month,
                "day": user.DOB_day
                },
                "email": user.email,
                "phone": user.phoneNumber
            }
            var customerUrl = PaySafe.URIs.customersURI
            
            var result =  await Axios.post(customerUrl,customerData,{headers:PaySafe.Headers})
            if(result.data){
                user.customerToken = result.data.id
                await user.save()
                return {user,token}
            }
            else{
                return {error:result.error}
            }
        }
        catch(e){
            return {errorWithDB:e}
        }
    }
    
    async getUser(req){
        const usr = await User.findById(req.params.id)
        if(!usr){
            return {error:'User Not Found'}
        }
        console.log('GETTING USER DETAILS for USER:',usr.firstName)
        return usr
    }

    async getSingleUseCustomerToken(req){
        const usr = await User.findById(req.body.userId)
        if(!usr){
            return {error:"User Not Found"}
        }
        if(usr.customerToken){
            var reqUrl = `${PaySafe.URIs.customersURI}/${usr.customerToken}/singleusecustomertokens`
            var reqData = {
                "merchantRefNum": req.body.merchantRefNum,
                "paymentTypes": [
                "CARD"
                ]
            }
            var result = await Axios.post(reqUrl,reqData,{headers:PaySafe.Headers})
            
            if(result.data){
                return {singleUseCustomerToken:result.data.singleUseCustomerToken}
            }
            else{
                return {error:e}
            }
        }
        return {singleUseCustomerToken:""}
    }
}

module.exports = UserService