import React, {Component} from 'react';

import { Modal, Button } from 'react-bootstrap';

import { Row, FormGroup, FormControl, FormLabel, FormText } from 'react-bootstrap';

import { isEmpty } from '../shared/validator';

import { axiosInstance }  from "../service/axiosApi";

class CustomModal extends Component{

    state = {
        meals : {},
        errors: {}
    }

    componentDidMount(){
        this.setState({meals:this.props.meal})
        console.log(this.props.meal)
    }

    hide = () => {
        this.props.hide();
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let { meals } = this.state;
        meals[name] = value;

        this.setState({
            meals: meals
        });
    }

    validateLoginForm = (e) => {

        let errors = {};
        const { meals } = this.state;

        if (isEmpty(meals.food_name)) {
            errors.meals = "Food Name can't be blank";
        }

        if (isEmpty(meals.calorie)) {
            errors.calorie = "Calorie can't be blank";
        }

        if (isEmpty(errors)) {
            return true;
        } else {
            return errors;
        }
    }

    updateMeal = (async event => {
        event.preventDefault();
        try {
            console.log(this.state.meals)
            const res = await axiosInstance.put(`/meals/${this.state.meals.id}/`, {
                id: [].concat(this.state.meals.id),
                food_name: [].concat(this.state.meals.food_name),
                calorie: [].concat(this.state.meals.calorie),
                description: [].concat(this.state.meals.description)
            });
            console.log(res)
            this.props.hide()
            //window.location.href = '/'
            //return res;
        } catch (error) {
            alert("Error : Please enter valid Food Name or provide calories for custom food name")
            throw error;
        }
    });



    render(){

        const { errors } = this.state;

        return (
            <div>
                
                 <Modal show={this.props.show} onHide={this.hide} animation={false} >
                    <Modal.Header closeButton>
                        <Modal.Title>Update Meal!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <div className="Login">
                        <Row>
                            <form onSubmit={this.updateMeal}>
                                <FormGroup>
                                    <FormLabel>Food Name</FormLabel>
                                    <FormControl type="text" name="food_name" placeholder={this.state.meals.food_name} onChange={this.handleInputChange} />
                                { errors.food_name &&
                                    <FormText>{errors.food_name}</FormText>
                                }
                                </FormGroup>
                                <FormGroup>
                                    <FormLabel>Calorie</FormLabel>
                                    <FormControl name="calorie" type="number" step="0.01" min="0" max="10" 
                                        placeholder={this.state.meals.calorie} onChange={this.handleInputChange} />
                                { errors.calorie &&
                                    <FormText>{errors.calorie}</FormText>
                                }
                                </FormGroup>
                                <FormGroup>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl name="description" type="text" placeholder={this.state.meals.description}
                                        onChange={this.handleInputChange} />
                                { errors.description &&
                                    <FormText>{errors.description}</FormText>
                                }
                                </FormGroup>
                                {/* <Button type="submit">Update</Button> */}
                            </form>
                        </Row>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.hide}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.updateMeal}>
                            Update
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

}

export default CustomModal;