import React from 'react';


function MealList(props) {

    const mealClicked = meal => evt => {
        props.mealClicked(meal);
    }

    return (
        <div>
            <h2>Meal List</h2>
            {
                
                props.meals.map( meal => {
                    return <div key={meal.id} onClick={mealClicked(meal)} className="meal-item">
                        {/* <h3 ></h3> */}
                        ID : {meal.id}<br />
                        Food Name : {meal.food_name}<br />
                        </div>
                })
            }
        </div>
    )
}

export default MealList;