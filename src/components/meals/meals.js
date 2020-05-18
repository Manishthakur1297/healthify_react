import React, { Component } from 'react';
//import './App.css';

import MealList from './list_meals'

//import { withCookies } from 'react-cookie';

import { axiosInstance }  from "../service/axiosApi";

import CustomModal from './modal';

import { ProgressBar } from 'react-bootstrap';

class Meal extends Component{

  state = {
    meals : [],
    selectedMeal: null,
    curr_calorie:0,
    max_calorie:2000,
    show:false
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

  getmeals = () => {
    try{
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
  }

  mealClicked = meal => {
    console.log(meal)
    this.setState({selectedMeal: meal})
    this.setState({show:true})

  }

  hide = () => {
    this.setState({show:false})
    this.getmeals()
  }

  render(){
    const curr = this.state.curr_calorie
    const max = this.state.max_calorie
    const curr1 = curr / max * 100
    var variant = 'success'
    if(curr1<=33){
      variant = 'success'
    }
    else if (curr1<=66)
    {
      variant = 'info'
    }
    else if (curr1<=99)
    {
      variant = 'warning'
    }
    else
    {
       variant = 'danger'
    }

  return (
    <div className="App">
      {/* label={`${this.state.now}%`} */}
      <ProgressBar animated variant={variant} now={curr1} />
    <br />
      <div className="layout">
        <MealList getmeals={this.getmeals} meals={this.state.meals} curr_calorie={this.state.curr_calorie} max_calorie={this.state.max_calorie} mealClicked={this.mealClicked} />
        {this.state.show ?
        <CustomModal meal={this.state.selectedMeal} show={this.state.show} hide={this.hide}/> 
        :
        null}
      </div>
    </div>
    );
  }
}


export default Meal;
