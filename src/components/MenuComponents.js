import React from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';

// this is how I add new component to the react app
        function RenderMenuItem({ dish, onClick }){
            return(
            <Card onClick={() => onClick(dish.id)}>
                <CardImg width="100%" src={dish.image} alt={dish.name} />
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Card>
            );

        }
        const Menu = (props) =>{
            const menu = props.dishes.map((dish) => {
                return (
                    // col 12 for extra-small and small screens
                    <div key={dish.id} className="col-12 col-md-5 m-1">
                       <RenderMenuItem dish = {dish} onClick={props.onClick}/>
                    </div>
                );
            });
    
            return (
                <div className="container">
                    <div className="row">
                        {menu}
                    </div>
                </div>
            );
        };

        
 
// always export the component to use it somewhere else
export default Menu;