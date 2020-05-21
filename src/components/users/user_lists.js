import React, { Component } from 'react';
import { axiosInstance }  from "../service/axiosApi";

var FontAwesome = require('react-fontawesome');

class UserList extends Component{

    state = {

    }

    userClicked = user => evt => {
        this.props.userClicked(user);
    }


    user_delete = user => evt => {
        console.log(user)
        try {
            axiosInstance.delete(`/users/${user.id}`).then(res => 
                {
                    this.props.getUsers()
                }).catch(error => console.log(error))
        } catch (error) {
            throw error;
        }
    }

    render() {

        let users = this.props.users
        //console.log(users[0])
        if(users.length===1)
        {
            let meals = users[0].meals
            let count = 0
            if(meals.length>0){
                meals.map( meal => {
                    count+=meal.calorie
                })
            }
            //console.log(count)

            let limit = count<users[0].max_calorie ? false : true

            console.log(limit)

            return(
                <div>
                <h2>User Profile</h2><br />
                <div key={users[0].id} onClick={this.userClicked(users[0])} className="user-item">
                    ID : {users[0].id}<br />
                    Username : {users[0].name}<br />
                    Email : {users[0].email}<br />
                    Curr Calorie : {count}<br />
                    Max Calorie : {users[0].max_calorie}<br />
                    Limit Exceeded : { limit ? "True" : "False" }<br />
                    {console.log(users[0])}
                    <div className="icons-block">
                        <FontAwesome name="edit" className="icon-edit"  onClick={this.userClicked(users[0])}/>
                        {/* <FontAwesome name="trash" className="icon-trash" onClick={this.meal_delete(meal)}/> */}
                    </div>
                </div>
                </div>
            )
        }
        else
        {

            return (
                <div>
                    <h2>Users List</h2>
                    {   
                        
                        this.props.users.map( user => {
                            return <div key={user.id} className="user-item">

                                ID : {user.id}<br />
                                Username : {user.name}<br />
                                Email : {user.email}<br />
                                Max Calorie : {user.max_calorie}<br />
                                <div className="icons-block">
                                    <FontAwesome name="edit" className="icon-edit"  onClick={this.userClicked(user)}/>
                                    <FontAwesome name="trash" className="icon-trash" onClick={this.user_delete(user)}/>
                                </div>
                            </div>

                        })
                    }
                </div>

        )}
    }
}

export default UserList;