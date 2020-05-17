import React, { Component } from "react";

import { registerInstance } from "../service/axiosApi";

class Signup extends Component{

    state = {
        signup: {
            name: '',
            email: '',
            password: ''
        }
    }

    inputChanged = event => {
        let user = this.state.signup;
        user[event.target.name] = event.target.value
        this.setState({signup:user})
    }


    // register = event => {
    //     console.log(this.state.signup)
    //     fetch(`${process.env.REACT_APP_API_URL}/register/`, {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json'},
    //         body: JSON.stringify(this.state.signup)
    //         })
    //         .then( resp => 
    //             {
    //                 // console.log(resp)
    //                 resp.json()
    //             })
    //         .then( res => {
                
    //             console.log(res);
    //             // this.props.cookies.set('access', res.access);
    //             // this.props.cookies.set('refresh', res.refresh);
    //             window.location.href = "/login";
    //         })
    //         .catch( error => console.log(error))
    // }

    register = (async event => {
        event.preventDefault();
        try {
            console.log(this.state.signup)
            const res = await registerInstance.post('/register/', {
                name: this.state.signup.name,
                email: this.state.signup.email,
                password: this.state.signup.password
            });
            console.log(res)
            window.location.href = '/'
            //return res;
        } catch (error) {
            throw error;
        }
    });

    render(){

        return (
            <div className="login-container">

                <h1>Register!</h1>
                <span>Email</span><br />
                <input name="email" type="email" value = {this.state.signup.email} 
                    onChange={this.inputChanged} /><br /><br />

                <span>Username</span><br />
                <input name="name" type="text" value = {this.state.signup.name} 
                    onChange={this.inputChanged} /><br /><br />

                <span>Password</span><br />
                <input name="password" type="password" value = {this.state.signup.password} 
                    onChange={this.inputChanged} /><br /><br />

                <button onClick={this.register}>Sign Up</button>
                
            </div>
        )    
    }

}
    
export default Signup;