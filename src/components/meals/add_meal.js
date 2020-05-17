import React, { Component } from "react";

import { axiosInstance } from "../service/axiosApi";

class AddMeal extends Component{

    state = {
        meals: {
            food_name:'',
            calorie: '0',
            description: ''
        }
    }

    inputChanged = event => {
        let meal = this.state.meals;
        meal[event.target.name] = event.target.value
        this.setState({meals:meal})
    }


    //     add_meal = event => {
    //     fetch(`${process.env.REACT_APP_API_URL}/meals/`, {
    //         method: 'POST',
    //         headers : {
    //             'Authorization': 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTU5MDgzNzk1NiwianRpIjoiYTljODUyYjcyYjAwNDA1M2IxOTc3ODg3OTFmNmIzNDAiLCJlbWFpbCI6Im1qdGhha3VyNDEzQGdtYWlsLmNvbSJ9.Wk1kryZMHp4jX-e1sC1nfiMxHIgEZA43KNK-_HHKhL0',
    //             'Content-Type': 'application/x-www-form-urlencoded'
    //           }, 
    //         // headers: {'Authorization' : 'JWT eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTU5MDgzNzk1NiwianRpIjoiYTljODUyYjcyYjAwNDA1M2IxOTc3ODg3OTFmNmIzNDAiLCJlbWFpbCI6Im1qdGhha3VyNDEzQGdtYWlsLmNvbSJ9.Wk1kryZMHp4jX-e1sC1nfiMxHIgEZA43KNK-_HHKhL0',
    //         // 'Content-Type': 'application/json'},
    //         body: JSON.stringify(this.state.meals)

    //         })
    //         .then( resp => resp.json())
    //         .then( res => {
    //             console.log(res);
    //             //this.props.cookies.set('access', res.access);
    //             //this.props.cookies.set('refresh', res.refresh);
    //             //window.location.href = "/";
    //         })
    //         .catch( error => console.log(error))
    // }


    add_meal = (async event => {
        event.preventDefault();
        try {
            console.log(this.state.meals)
            const res = await axiosInstance.post('/meals/', {
                food_name: [].concat(this.state.meals.food_name),
                calorie: [].concat(this.state.meals.calorie),
                description: [].concat(this.state.meals.description)
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
                <h1>Add Meal!</h1>
                <span>Food Name</span><br />
                <input name="food_name" type="text" value = {this.state.meals.food_name} 
                    onChange={this.inputChanged} /><br /><br />

                <span>Calorie</span><br />
                <input name="calorie" type="number" step="0.01" min="0" max="10" 
                value = {this.state.meals.calorie} onChange={this.inputChanged} /><br /><br />

                <span>Description</span><br />
                <input name="description" type="text" value = {this.state.meals.description} 
                    onChange={this.inputChanged} /><br /><br />

                <button onClick={this.add_meal}>Add Meal</button>
                
            </div>
        )    
    }

}
    
export default AddMeal;