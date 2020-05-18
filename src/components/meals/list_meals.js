import React, { Component } from "react";



import { Card } from 'react-bootstrap';
import { axiosInstance }  from "../service/axiosApi";

//import { FontAwesome } from "@fontwesome/react-fontawesome";

var FontAwesome = require('react-fontawesome');

class MealList extends Component{

    state = {

    }

    mealClicked = meal => evt => {
        this.props.mealClicked(meal);
    }

    variant = 'Info'
    idx = 5

    // const [show, setShow] = useState(false);
    // var meal = null
    // const handleClose = () => setShow(false);
    // const handleShow = (meal) => 
    //     {
    //         meal=meal
    //         setShow(true);
    //     }


    meal_delete = meal => evt => {
        console.log(meal)
        try {
            axiosInstance.delete(`/meals/${meal.id}`).then(res => 
                {
                    this.props.getmeals()
                }).catch(error => console.log(error))
        } catch (error) {
            throw error;
        }
    }

    render(){
    return (
        <div>
            {
                
                this.props.meals.map( meal => {
                    return <div key={meal.id} className="meal-item">

                       

                        <Card
                            bg={this.variant.toLowerCase()}
                            key={this.idx}
                            text={this.variant.toLowerCase() === 'light' ? 'dark' : 'white'}
                            style={{ width: '18rem' }}
                            >
                            <Card.Header>ID : {meal.id}</Card.Header>
                            <Card.Body>
                                <Card.Title>{meal.food_name} | {meal.calorie} </Card.Title>
                                <Card.Text>
                                {meal.description}
                                </Card.Text>
                                <div className="icons-block">
                                    <FontAwesome name="edit" className="icon-edit"  onClick={this.mealClicked(meal)}/>
                                    <FontAwesome name="trash" className="icon-trash" onClick={this.meal_delete(meal)}/>
                                </div>
                            </Card.Body>
                            </Card>

                        </div>
                })
            }
        </div>
    )}
}

export default MealList;