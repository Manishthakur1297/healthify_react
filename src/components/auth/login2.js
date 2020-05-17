import React, {Component} from 'react';
import { withCookies } from 'react-cookie';

import { axiosInstance }  from "../service/axiosApi";

class Login extends Component{

    state = {
        signin: {
            email: '',
            password: ''
        }
    }

    inputChanged = event => {
        let user = this.state.signin;
        user[event.target.name] = event.target.value
        this.setState({signin:user})
        //  console.log(this.state.signin)
    }


    // login = event => {
    //     fetch(`${process.env.REACT_APP_API_URL}/login/`, {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json'},
    //         body: JSON.stringify(this.state.signin)
    //         })
    //         .then( resp => resp.json())
    //         .then( res => {
    //             console.log(res);
    //             this.props.cookies.set('access', res.access);
    //             this.props.cookies.set('refresh', res.refresh);
    //             window.location.href = "/meals";
    //         })
    //         .catch( error => console.log(error))
    // }

    login =(async event => {
        //event.preventDefault();
        try {
            console.log(this.state.signin)
            const res = await axiosInstance.post('/login/', {
                
                email: this.state.signin.email,
                password: this.state.signin.password
            })
            console.log(res)
            //console.log(res.data.access, res.data.refresh)
            axiosInstance.defaults.headers['Authorization'] = "JWT " + res.data.refresh;
            localStorage.setItem('access_token', res.data.access);
            localStorage.setItem('refresh_token', res.data.refresh);
            localStorage.setItem('user', this.state.signin.email);
            //this.props.handler(false)
            window.location.href = "/dashboard";
        } catch (error) {
            throw error;
        }
    });

    render(){

        return (
            <div className="login-container">

                <h1>Login!</h1>
                <span>Email</span><br />
                <input name="email" type="text" value = {this.state.signin.email} 
                    onChange={this.inputChanged} /><br /><br />

                <span>Password</span><br />
                <input name="password" type="password" value = {this.state.signin.password} 
                    onChange={this.inputChanged} /><br /><br />

                <button onClick={this.login}>Login</button>
                
            </div>
        )    
    }

}

export default withCookies(Login);