import React from 'react';
import PaymentForm from './components/PaymentForm'
import Register from './components/Register'
import Header from './components/Header'
import Footer from './components/Footer'
import Login from './components/Login'
import axios from 'axios';
import config from './config'
import './App.css';

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        firstName:"",
        lastName:"",
        email:"",
        phoneNo:"",
        day:0,
        month:0,
        year:0,
        street1:"",
        street2:"",
        city:"",
        state:"",
        country:"",
        zipCode:"",
        amount:0,
        password:""
        }
}

fetchUserDetails = () => {
  axios.get(`/user/${window.localStorage.userId}`,{headers:config.Headers})
  .then((res)=>{
    const u = res.data
    this.setState({firstName:u.firstName})
    this.setState({lastName:u.lastName})
    this.setState({email:u.email})
    this.setState({phoneNo:u.phoneNumber})
    this.setState({day:u.DOB_day})
    this.setState({month:u.DOB_month})
    this.setState({year:u.DOB_year})
  })
}

makePayment = (e) => { 
  e.preventDefault();
  var singleUseCustomerToken = ""

  const apiKey = config.CLIENT_API.Key
  var merchRefNum = '_' + Math.random().toString(36).substr(2, 9)

  axios.post('/user/singleUseCustomerToken',{
    merchantRefNum:merchRefNum,
    userId:window.localStorage.getItem('userId')
  },{headers:config.Headers})
  .then(res=> {
    singleUseCustomerToken = res.data.singleUseCustomerToken
    
    var options = {
      "currency": "USD",
      "amount": this.state.amount,
      "singleUseCustomerToken": singleUseCustomerToken,
      "locale": "en_US",
      "customer": {
          "firstName": this.state.firstName,
          "lastName": this.state.lastName,
          "email": this.state.email,
          "phone": this.state.phoneNo,
          "dateOfBirth": {
              "day": this.state.day,
              "month": this.state.month,
              "year": this.state.year
          }
      },
      "billingAddress": {
          "nickName": this.state.firstName + " " + this.state.lastName,
          "street": this.state.street1,
          "street2": this.state.street2,
          "city": this.state.city,
          "zip": this.state.zipCode,
          "country": this.state.country,
          "state": this.state.state
      },
      "environment": "TEST",
      "merchantRefNum": merchRefNum,
      "canEditAmount": false,
      "merchantDescriptor": {   
          "dynamicDescriptor": "XYZ",
          "phone": "1234567890"
          },
      "displayPaymentMethods":["card"],
      "paymentMethodDetails": {}
    }

    window.paysafe.checkout.setup(apiKey,options ,
       function(instance, error, result) {
      if (result && result.paymentHandleToken) {         
          axios.post('/makePayment',{
              paymentHandleToken:result.paymentHandleToken,
              amount:result.amount,
              customerOperation:result.customerOperation,
              userId:window.localStorage.getItem('userId'),
              merchRefNum:merchRefNum
          },{headers:config.Headers}).then((res)=> {
            if(res.status===200){
              window.location.reload()
              alert('Payment Successful!')
            }
            else{
              window.location.reload()
              alert('Payment Unsuccessful!, Please try again..')
            }
        })
      }
      else {
        console.error(error);
        // Handle the error 
        window.location.reload()
        alert('Payment Unsuccessful!, Please try again..')
      }
    });
  })
  .catch(err=>console.error(err))
}

registerUser = (e) => {
  e.preventDefault()
  var user = {
      firstName:this.state.firstName,
      lastName:this.state.lastName,
      email:this.state.email,
      password:this.state.password,
      phoneNumber:this.state.phoneNo,
      DOB_day:this.state.day,
      DOB_month:this.state.month,
      DOB_year:this.state.year
  }
  axios.post('/user/register',{
      user:user
  }).then((res)=>{
    if(res.status===201){
      var token = res.data.token
      window.localStorage.setItem('token',token)
      window.localStorage.setItem('userId',res.data.user._id)
      window.location.reload()
      alert("User Registered Succesfully!")
    }
  })
  .catch(e=>alert("User already exists with same email id, Please check.."))
}

handleChange = (e) => {
  const inputNm = e.target.name
  switch(inputNm){
      case "firstName": this.setState({firstName:e.target.value})
      break
      case "lastName": this.setState({lastName:e.target.value})
      break
      case "email": this.setState({email:e.target.value})
      break
      case "phoneNo": this.setState({phoneNo:e.target.value})
      break
      case "day": this.setState({day:parseInt(e.target.value)})
      break
      case "month": this.setState({month:parseInt(e.target.value)})
      break
      case "year": this.setState({year:parseInt(e.target.value)})
      break
      case "street1": this.setState({street1:e.target.value})
      break
      case "street2": this.setState({street2:e.target.value})
      break
      case "city": this.setState({city:e.target.value})
      break
      case "state": this.setState({state:e.target.value})
      break
      case "country": this.setState({country:e.target.value})
      break
      case "zipCode": this.setState({zipCode:e.target.value})
      break
      case "amount": this.setState({amount:parseFloat(e.target.value)})
      break
      case "password": this.setState({password:e.target.value})
      break
      default:break
  }
}

login = async (userEmail,userPassword) =>{
  var result = await axios.post('/user/login',{email:userEmail,password:userPassword})

  if(result.data.user){
    window.localStorage.setItem('token',result.data.token)
    window.localStorage.setItem('userId',result.data.user._id)
    window.location.reload()
    alert("User Logged In Succesfully!")
  }
  else if(result.data.error){
    alert("Please Check Credentials..")
  }
}

logout = (e) =>{
  e.preventDefault()
  window.localStorage.clear()
  window.location.reload()
}

  render(){
    var render 
    if(window.localStorage.getItem('token')){
    render = <div className="row"><h5>Logged-In User:{this.state.firstName} {this.state.lastName}</h5><button className="btn waves-effect waves-light" onClick={this.logout} >Logout</button><PaymentForm fetchUser={this.fetchUserDetails} user={this.state} changeHandle={this.handleChange} makePay={this.makePayment}/></div>
    }
    else{
      render = <div className="row"><Login loginUser={this.login}/><Register user={this.state} changeHandle={this.handleChange} register={this.registerUser}/></div>
    }
    return(
      <div>
        <Header/>
        {render}
        <Footer/>
      </div>
    )
  }
}

export default App;
