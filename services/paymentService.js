const PaySafe = require('../config/paysafeURIs')
const { default: Axios } = require('axios')

class PaymentService{

    async makePayment(req){
        var amount = req.body.amount
        var token = req.body.paymentHandleToken.toString()
        var merchRefNum = req.body.merchRefNum
        var url = PaySafe.URIs.paymentsURI
        var data = {
            "merchantRefNum":merchRefNum,
            "amount":amount,
            "currencyCode":"USD",
            "dupCheck":true,
            "settleWithAuth":false,
            "paymentHandleToken":token
        }
        var result = await Axios.post(url,data,{headers:PaySafe.Headers})
        if(!result.data.error){
            console.log(result.data)
            return 'Success'
        }
        else{
            return 'ERROR'
        } 
    }
}

module.exports = PaymentService