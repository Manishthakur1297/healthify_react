import React, { Component } from 'react';
//import './App.css';

import MealList from './list_meals'

//import { withCookies } from 'react-cookie';

import { axiosInstance }  from "../service/axiosApi";

import CustomModal from './modal';

import { ProgressBar } from 'react-bootstrap';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class Meal extends Component{

  state = {
    meals : [],
    selectedMeal: null,
    curr_calorie:0,
    max_calorie:2000,
    show:false,
    date:new Date()
  }

  componentDidMount(){
      this.getmeals()
      this.getusers()
  }

formatDate(d)
{
    var month = d.getMonth();
    var day = d.getDate().toString();
    var year = d.getFullYear();

    year = year.toString().substr(-2);

    month = (month + 1).toString();

    if (month.length === 1)
    {
        month = "0" + month;
    }

    if (day.length === 1)
    {
        day = "0" + day;
    }

    return day + month + year;
}

  getmeals = () => {
        let filterDate = this.formatDate(this.state.date)
        console.log(filterDate)
    try{
        axiosInstance.get('/meals/', { 
          params: {
          date: filterDate
          }
        }).then(res => 
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

  getusers = () => {
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


  componentDidUpdate(prevProps, prevState) {
    console.log(this.state.date)
    console.log(prevState.date)
    if(this.state.date !== prevState.date)
    {
      this.getmeals();
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

  dateChanged = (date) => {
      this.setState({date:date})
      //this.getmeals()
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
        <ProgressBar animated variant={variant} now={curr1} label={`${curr1.toFixed(0)}%`}/>
      <br />
      <section className="container">
        <div className="left-half">
          <DatePicker
            selected={this.state.date}
            onSelect={this.dateChanged}
            inline
          />
          </div>
          {this.state.show ?
            <CustomModal meal={this.state.selectedMeal} show={this.state.show} hide={this.hide}/> 
            :
            null}
          <div className="right-half">
            <MealList getmeals={this.getmeals} variantColor={variant} meals={this.state.meals} curr_calorie={this.state.curr_calorie} max_calorie={this.state.max_calorie} mealClicked={this.mealClicked} />
            
        </div>
      </section>
    </div>
    );
  }
}


export default Meal;
