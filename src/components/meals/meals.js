import React, { Component } from 'react';
//import './App.css';

import MealList from './list_meals'

//import { withCookies } from 'react-cookie';

import { axiosInstance }  from "../service/axiosApi";

import { Card } from 'react-bootstrap';


class Meal extends Component{

  state = {
    meals : [],
    selectedMeal: null,
    curr_calorie:0,
    max_calorie:2000
  }

  componentDidMount(){

    try {
        axiosInstance.get('/meals/').then(res => 
            {
                console.log(res.data)
                this.setState({meals: res.data})
                let count = 0
                res.data.forEach(meal => {
                    count+=meal.calorie
                })
                console.log(count)
                this.setState({curr_calorie:count})

            }).catch(error => console.log(error))
    } catch (error) {
        throw error;
    }


    try {
        axiosInstance.get('/users/').then(res => 
            {
                console.log(res.data)
                let data = [].concat( res.data );
                this.setState({max_calorie: data[0].max_calorie})
                console.log(data)
                console.log(this.state.max_calorie)    

            }).catch(error => console.log(error))
    } catch (error) {
        throw error;
    }



  }

  mealClicked = meal => {
    console.log(meal)
    this.setState({selectedMeal: meal})

  }

  variant = 'Info'
  idx = 5

  render(){
  return (
    <div className="App">
      <h1>Meal App</h1>
      <h4>{this.state.curr_calorie}/{this.state.max_calorie}</h4> 

      <Card
      bg={this.variant.toLowerCase()}
      key={this.idx}
      text={this.variant.toLowerCase() === 'light' ? 'dark' : 'white'}
      style={{ width: '18rem' }}
    >
      <Card.Header>Header</Card.Header>
      <Card.Body>
        <Card.Title>{this.variant} Card Title </Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
    <br />
      <div className="layout">
        <MealList meals={this.state.meals} curr_calorie={this.state.curr_calorie} max_calorie={this.state.max_calorie} mealClicked={this.mealClicked} />
        {/* <MealDetails meal={this.state.selectedMeal} /> */}
      </div>
    </div>
    );
  }
}


export default Meal;
