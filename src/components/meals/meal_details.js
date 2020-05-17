import React, {Component} from 'react'

class MealDetails extends Component
{
    render()
    {

        return( 
        <div>
            { this.props.meal ? (
            <div>
            <h2>Meal Details</h2>
            
                <div className="meal-item">
                    <p>ID : {this.props.meal.id}</p>
                    <p>Food Name : {this.props.meal.food_name}</p>
                    <p>Calorie : {this.props.meal.calorie}</p>
                    <p>Description : {this.props.meal.description}</p>
                </div>
            </div>) : null }
        </div>)
    }
}

export default MealDetails;