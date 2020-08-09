import React from 'react'

export default function Register(props) {
  return (
    <div>
      <h5>If not Registered, Please Register to Proceed:</h5>
        <form className="col s12" onSubmit={props.register}>
        <div className="row">
        <div className="input-field col s6">
          <input name="firstName" value={props.user.firstName} onChange={props.changeHandle} type="text" className="validate" />
          <label htmlFor="first_name">First Name</label>
        </div>
        <div className="input-field col s6">
          <input name="lastName" value={props.user.lastName} onChange={props.changeHandle} type="text" className="validate" />
          <label htmlFor="last_name">Last Name</label>
        </div>
      </div>
      <div className="row">
      <div className="input-field col s6">
          <input name="email" value={props.user.email} onChange={props.changeHandle} type="email" className="validate" />
          <label htmlFor="email_id">Email Id</label>
      </div>
        <div className="input-field col s6">
          <input name="phoneNo" value={props.user.phoneNo} onChange={props.changeHandle} type="text" className="validate" />
          <label htmlFor="phone_no">Phone Number</label>
        </div>
      </div>
      <div className="row">
        <div className="col s3">
          <h5>Date Of Birth:</h5>
        </div>
        <div className="input-field col s3">
          <input name="day" value={props.user.day} onChange={props.changeHandle} type="number" className="validate" />
          <label htmlFor="day">Day</label>
        </div>
        <div className="input-field col s3">
          <input name="month" value={props.user.month} onChange={props.changeHandle} type="number" className="validate" />
          <label htmlFor="month">Month</label>
        </div>
        <div className="input-field col s3">
          <input name="year" value={props.user.year} onChange={props.changeHandle} type="number" className="validate" />
          <label htmlFor="year">Year</label>
        </div>
            </div>
            <div className="row">
            <div className="input-field col s6">
          <input name="password" value={props.user.password} onChange={props.changeHandle} type="password" className="validate" />
          <label htmlFor="password">Password</label>
          </div>
          <div className="col s6">
          <button id="btnRegister" className="btn waves-effect waves-light" type="submit" name="paybutton">
                Register
          </button>
          </div>
          </div>
        </form>
    </div>
  )
}

