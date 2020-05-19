import React, {Component} from 'react';

import { Button } from 'react-bootstrap';

import { Row, FormGroup, FormControl, FormLabel, FormText } from 'react-bootstrap';

import { isEmpty } from '../shared/validator';

import { axiosInstance }  from "../service/axiosApi";

class AddMeal extends Component{

    state = {
        meals: {
            food_name:'',
            calorie: '0',
            description: ''
            },
        errors: {}
    }


    inputChanged = event => {
        let meal = this.state.meals;
        meal[event.target.name] = event.target.value
        this.setState({meals:meal})
    }

    validateLoginForm = (e) => {

        let errors = {};
        const { meals } = this.state;

        if (isEmpty(meals.food_name)) {
            errors.meals = "Food Name can't be blank";
        }

        // if (isEmpty(meals.calorie)) {
        //     errors.calorie = "Calorie can't be blank";
        // }

        if (isEmpty(errors)) {
            return true;
        } else {
            return errors;
        }
    }

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
            alert("Error : Please enter valid Food Name or provide calories>0 for custom food name")
            throw error;
        }
    });


    render(){

        const { errors } = this.state;

        return (
            <div>
                <div className="Login">
                    <Row>
                        <form onSubmit={this.add_meal}>
                            <FormGroup>
                                <FormLabel>Food Name</FormLabel>
                                <FormControl type="text" name="food_name" value = {this.state.meals.food_name} placeholder="Enter Food Name" onChange={this.inputChanged} />
                            { errors.food_name &&
                                <FormText>{errors.food_name}</FormText>
                            }
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Calorie</FormLabel>
                                <FormControl name="calorie" type="number" step="0.01" min="0" max="2000" 
                                    placeholder="Enter Calorie Count" value = {this.state.meals.calorie} onChange={this.inputChanged} />
                            { errors.calorie &&
                                <FormText>{errors.calorie}</FormText>
                            }
                            </FormGroup>
                            <FormGroup>
                                <FormLabel>Description</FormLabel>
                                <FormControl name="description" type="text" placeholder="Enter Description"
                                    value = {this.state.meals.description} onChange={this.inputChanged} />
                            { errors.description &&
                                <FormText>{errors.description}</FormText>
                            }
                            </FormGroup>
                            <Button type="submit">Add Meal</Button>
                        </form>
                    </Row>
                    </div>
            </div>
        )
    }

}

export default AddMeal;