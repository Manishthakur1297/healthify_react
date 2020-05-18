import React, { Component} from "react";
import { Switch, Route, Link } from "react-router-dom";
import Login from "./auth/login";
import Signup from "./auth/signup";
import Meal from "./meals/meals";
// import './App.css';
import './style.css'
import User from "./users/users"
import AddMeal from "./meals/add_meal"

import { axiosInstance } from "./service/axiosApi";

import {Nav, Navbar} from 'react-bootstrap'

class App extends Component {

  state = {
    //isLoginView: true,
    elem : localStorage.getItem('refresh_token'),
    user: localStorage.getItem('user')
  }

  handleLogout =  event => {
    try {
        // const response = await axiosInstance.post('/blacklist/', {
        //     "refresh_token": localStorage.getItem("refresh_token")
        // });
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        axiosInstance.defaults.headers['Authorization'] = null;
        //this.setState({isLoginView:!this.state.isLoginView})
        window.location.href = '/'
    }
    catch (e) {
        console.log(e);
    }
};

    render() {
        return (

          <div>
            { !this.state.elem ?
              <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/">Healthify</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/signup">Signup</Nav.Link>
                </Navbar.Collapse>
            </Navbar>

            :

            <Navbar bg="dark" variant="dark">
              <Navbar.Brand href="/">Healthify</Navbar.Brand>
              <Nav className="mr-auto">
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                <Nav.Link href="/meals">Add Meal</Nav.Link>
                <Nav.Link href="/users">Profile</Nav.Link>
              </Nav>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    Signed in as: <b>{this.state.user}</b>
                    
                </Navbar.Text>
                <Nav.Link onClick={this.handleLogout}>Logout</Nav.Link>
              </Navbar.Collapse>
            </Navbar>
          
          }
                <main>

                    <Switch>
                        {/* <Route exact path={"/login/"} render={() => <Login handler = {this.handler} />}/> */}
                        <Route exact path={"/login/"} component={Login}/>
                        <Route exact path={"/signup/"} component={Signup}/>
                        <Route exact path={"/dashboard/"} component={Meal}/>
                        <Route exact path={"/users/"} component={User}/>
                        <Route exact path={"/meals/"} component={AddMeal}/>
                        <Route path={"/"}
                        render={ () =>  ( 
                          <div>
                            { !this.state.elem ?
                              <Login  />
                              :
                              <Meal  />
                            }
                          </div>
                        )} />
                    </Switch>
                </main>
            </div>
        );
    }
}

export default App;