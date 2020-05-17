import React from 'react';


function UserList(props) {

    //const users = ['Pizza', 'Burger', 'Apple']

    const userClicked = user => evt => {
        //props.userClicked(user)
        props.userClicked(user);
    }

    return (
        <div>
            <h2>User List</h2>
            {console.log(props.users)}
            {   
                
                props.users.map( user => {
                    return <div key={user.id} onClick={userClicked(user)} className="meal-item">
                        {/* <h3 ></h3> */}
                        {user.id}<br />
                        {user.name}<br />
                        {/* {user.email}<br />
                        {user.curr_calorie}<br />
                        {user.max_calorie}<br />
                        {user.limit}<br /> */}
                        
                        </div>
                })
            }
        </div>
    )
}

export default UserList;