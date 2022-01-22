import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import DishDetail from './DishdetailComponent';
// this is how I add new component to the react app
class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedDish: null
        }
    }

    onDishSelect(dish) {
        this.setState({selectedDish: dish})
    }



    // every component should implement this method render
    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
                // col 12 for extra-small and small screens
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={() => this.onDishSelect(dish)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    {menu}
                </div>
                <DishDetail dish={this.state.selectedDish} />
            </div>
        );
    }
}
// always export the component to use it somewhere else
export default Menu;