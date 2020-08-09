const PAYSAFE = {
    URIs:{
        customersURI:'https://api.test.paysafe.com/paymenthub/v1/customers',
        paymentsURI:'https://api.test.paysafe.com/paymenthub/v1/payments'
    },
    Headers:{
        "Content-Type": "application/json",
        "Authorization": "Basic "+ process.env.PAYSAFE_API,
        "Simulator": "EXTERNAL"
    }
} 

module.exports = PAYSAFE