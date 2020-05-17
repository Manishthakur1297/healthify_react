import React, { Component } from 'react';
//import { withCookies } from 'react-cookie';
import { axiosInstance }  from "../service/axiosApi";

import UserList from './user_lists'
import UserDetails from './user_details'

class User extends Component{

    state = {
        users : [],
        selectedUser: null,
        curr_calorie:0
      }
    
      componentDidMount(){
        try {
            axiosInstance.get('/users/').then(res => 
                {
                    console.log(res.data)
                    let data = [].concat( res.data );
                    this.setState({users: data})    
    
                }).catch(error => console.log(error))
        } catch (error) {
            throw error;
        }
      }
    
      userClicked = user => {
        console.log(user)
        this.setState({selectedUser: user})
        let count = 0
        user.meals.forEach(meal => {
                  count+=meal.calorie
          })

        this.setState({curr_calorie:count})
    
      }
    
      render(){
      return (
        <div className="App">
          <h1>User App</h1>
          <div className="layout">  
            <UserList users={this.state.users} userClicked={this.userClicked} />
            <UserDetails curr_calorie={this.state.curr_calorie} user={this.state.selectedUser} />
          </div>
        </div>
        );
      }
    }
    

export default User;