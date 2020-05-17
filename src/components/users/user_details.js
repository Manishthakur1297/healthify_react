import React, {Component} from 'react'

class UserDetails extends Component
{
    // constructor(props)
    // {
    //     super(props)
        
    //     this.state = {
    //         curr_calorie: 0
    //     }
    //     this.count = 0
    // }


    // componentDidMount(){
    //     console.log(this.props.user)
    //     this.props.user.meals.forEach(meal => {
    //         this.count+=meal.calorie
    // })
    //     this.setState({curr_calorie:this.count})
    // }

    render()
    {

        return( 
        <div >
            <h2>User Details</h2>
            { this.props.user ? (
                <div className="meal-item">
                    <p>Name : {this.props.user.name}</p>
                    <p>Email : {this.props.user.email}</p>
                    <p>Curr Calorie : {this.props.curr_calorie}</p>
                    <p>Max Calorie : {this.props.user.max_calorie}</p>
                    {/* {this.props.user.meals} */}
                    {/* <h3>Meals </h3>
                    {this.props.user.meals.map( meal => {
                    return <div className="meal-details" key={meal.id}>
                                <p>ID : {meal.id}</p>
                                <p>Food Name : {meal.food_name}</p>
                                <p>Calorie : {meal.calorie}</p>
                                <p>Description : {meal.description}</p>
                            </div>
                    })} */}
                </div>
        ) : null            
    }
    </div>
    )
}
}

export default UserDetails;