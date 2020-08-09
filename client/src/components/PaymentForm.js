import React, { Component } from 'react'


export default class PaymentForm extends Component {
    
    componentDidMount(){
      this.props.fetchUser()
    }

    render() {
        return (
        <div>
          <h5>Make Payment with Registered User:</h5>
            <form className="col s12" onSubmit={this.props.makePay}>
        <div className="row">
        <div className="input-field col s6">
          <input readOnly name="firstName" value={this.props.user.firstName} onChange={this.props.changeHandle} type="text" className="validate" />
          <label htmlFor="first_name">First Name</label>
        </div>
        <div className="input-field col s6">
          <input readOnly name="lastName" value={this.props.user.lastName} onChange={this.props.changeHandle} type="text" className="validate" />
          <label htmlFor="last_name">Last Name</label>
        </div>
      </div>
      <div className="row">
      <div className="input-field col s6">
          <input name="email" value={this.props.user.email} onChange={this.props.changeHandle} type="email" className="validate" />
          <label htmlFor="email_id">Email Id</label>
      </div>
        <div className="input-field col s6">
          <input name="phoneNo" value={this.props.user.phoneNo} onChange={this.props.changeHandle} type="text" className="validate" />
          <label htmlFor="phone_no">Phone Number</label>
        </div>
      </div>
      <div className="row">
        <div className="col s3">
          <h5>Date Of Birth:</h5>
        </div>
        <div className="input-field col s3">
          <input name="day" value={this.props.user.day} onChange={this.props.changeHandle} type="number" class="validate" />
          <label htmlFor="day">Day</label>
        </div>
        <div className="input-field col s3">
          <input name="month" value={this.props.user.month} onChange={this.props.changeHandle} type="number" class="validate" />
          <label htmlFor="month">Month</label>
        </div>
        <div className="input-field col s3">
          <input name="year" value={this.props.user.year} onChange={this.props.changeHandle} type="number" class="validate" />
          <label htmlFor="year">Year</label>
        </div>
      </div>
      <div className="row">
        <div className="col s12">
          <h5>Billing Address:</h5>
        </div>
        <div className="input-field col s12">
          <input name="street1" value={this.props.user.street1} onChange={this.props.changeHandle} type="text" class="validate" />
          <label htmlFor="address_line">Address Line1</label>
        </div>
        <div className="input-field col s12">
          <input name="street2" value={this.props.user.street2} onChange={this.props.changeHandle} type="text" class="validate" />
          <label htmlFor="address_line">Address Line2</label>
        </div>
        <div className="input-field col s3">
          <input name="city" value={this.props.user.city} onChange={this.props.changeHandle} type="text" class="validate" />
          <label htmlFor="city">City</label>
        </div>
        <div class="input-field col s3">
          <input name="state" value={this.props.user.state} onChange={this.props.changeHandle} type="text" class="validate" />
          <label htmlFor="state">State Code</label>
        </div>
        <div className="input-field col s3">
          <input name="country" value={this.props.user.country} onChange={this.props.changeHandle} type="text" class="validate" />
          <label htmlFor="country">Country Code</label>
        </div>
        <div className="input-field col s3">
          <input name="zipCode" value={this.props.user.zipCode} onChange={this.props.changeHandle} type="text" class="validate" />
          <label htmlFor="zip">Zip-Code</label>
        </div>
      </div>
      <div className="row">
          <div className="col s3">
              <h5>Amount:</h5>
          </div>
          <div className="col s3">
            <input name="amount" value={this.props.user.amount} onChange={this.props.changeHandle} type="number" class="validate" />
            <label htmlFor="amount">Enter Amount in US dollars</label>
          </div>
          <div className="col s6">
          <button id="btnpayment" class="btn waves-effect waves-light" type="submit" name="paybutton">
          Make Payment
          </button>
          </div>
      </div>
    </form>
    </div>
        )
    }
}
