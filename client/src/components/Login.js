import React, { Component } from 'react'

export default class Login extends Component {
    constructor(props){
        super(props)
        this.state = {
            loginEmail:"",
            loginPwd:""
        }
    }
    handleChange = (e) => {
        var name = e.target.name
        if(name==="email"){
            this.setState({loginEmail:e.target.value})
        }
        else if(name==="password"){
            this.setState({loginPwd:e.target.value})
        }
    }
    handleLoginSubmit = (e) => {
        e.preventDefault()
        this.props.loginUser(this.state.loginEmail,this.state.loginPwd)
    }
    render() {
        return (
        <div>
            <h5 className="grey">Please Login to Proceed:</h5>
            <form className="col s12" onSubmit={this.handleLoginSubmit}>
                <div className="row">
                    <div className="input-field col s6">
                        <input name="email" value={this.state.loginEmail} onChange={this.handleChange} type="email" className="validate" />
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="input-field col s6">
                        <input name="password" value={this.state.loginPwd} onChange={this.handleChange} type="password" className="validate" />
                        <label htmlFor="password">Password</label>
                    </div>
                </div>
                <div className="row">
                    <div className="col s12 center">
                        <button className="btn waves-effect waves-light blue" type="submit" name="btnLogin">
                            Login
                        </button>
                    </div>
                </div>
            </form>
        </div>
        )
    }
}

