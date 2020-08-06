import React, { Component } from 'react'

export default class Register extends Component {

    constructor(props){
        super(props)
    }

    render() {
        return (
            <div>
              <h5>Register a User to Proceed:</h5>
                <form className="col s12" onSubmit={this.props.register}>
        <div className="row">
        <div className="input-field col s6">
          <input name="firstName" value={this.props.user.firstName} onChange={this.props.changeHandle} type="text" className="validate" />
          <label htmlFor="first_name">First Name</label>
        </div>
        <div className="input-field col s6">
          <input name="lastName" value={this.props.user.lastName} onChange={this.props.changeHandle} type="text" className="validate" />
          <label for="last_name">Last Name</label>
        </div>
      </div>
      <div class="row">
      <div className="input-field col s6">
          <input name="email" value={this.props.user.email} onChange={this.props.changeHandle} type="email" className="validate" />
          <label htmlFor="email_id">Email Id</label>
      </div>
        <div className="input-field col s6">
          <input name="phoneNo" value={this.props.user.phoneNo} onChange={this.props.changeHandle} type="text" className="validate" />
          <label for="phone_no">Phone Number</label>
        </div>
      </div>
      <div class="row">
        <div class="col s3">
          <h5>Date Of Birth:</h5>
        </div>
        <div class="input-field col s3">
          <input name="day" value={this.props.user.day} onChange={this.props.changeHandle} type="number" class="validate" />
          <label for="day">Day</label>
        </div>
        <div class="input-field col s3">
          <input name="month" value={this.props.user.month} onChange={this.props.changeHandle} type="number" class="validate" />
          <label for="month">Month</label>
        </div>
        <div class="input-field col s3">
          <input name="year" value={this.props.user.year} onChange={this.props.changeHandle} type="number" class="validate" />
          <label for="year">Year</label>
        </div>
            </div>
            <div className="row">
            <div class="input-field col s6">
          <input name="password" value={this.props.user.password} onChange={this.props.changeHandle} type="password" class="validate" />
          <label for="password">Password</label>
        </div>
            <div className="col s6">
          <button id="btnRegister" class="btn waves-effect waves-light" type="submit" name="paybutton">
          Register
          </button>
          </div>
          </div>
        </form>
        </div>
        )
    }
}
