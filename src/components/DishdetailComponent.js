import React, {Component} from "react";
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem,
  Button, Modal, ModalHeader, ModalBody, Label, Row,Col } from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from 'react-redux-form';

const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

//CommentForm Class start
class CommentForm extends Component {
  constructor(props){
      super(props);
      this.state = {
          isCommentModalOpen: false
      }
      this.toggleCommentModal = this.toggleCommentModal.bind(this);
      this.handleCommentSubmit = this.handleCommentSubmit.bind(this);

  }

  toggleCommentModal(){
      this.setState({
          isCommentModalOpen: !this.state.isCommentModalOpen,
          
      });
  }
  handleCommentSubmit(values){
    this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);


}

  render(){
      return(
          <React.Fragment>
          <Button outline onClick={this.toggleCommentModal}>
               <span className="fa fa-pencil "></span> Submit Comment
          </Button>

          <Modal isOpen={this.state.isCommentModalOpen} toggle={this.toggleCommentModal}>
              <ModalHeader toggle={this.toggleCommentModal}>Submit Comment</ModalHeader>
              <ModalBody>
                  <LocalForm onSubmit={(values)=>this.handleCommentSubmit(values)}>
                      <Row className='form-group'>
                      <Label htmlFor="rating" md={12} >Rating</Label>
                              <Col md={12}>
                                  <Control.select model=".rating"
                                      className="form-control"
                                      name="rating"
                                      id="rating"
                                  >
                                      <option>1</option>
                                      <option>2</option>
                                      <option>3</option>
                                      <option>4</option>
                                      <option>5</option>
                                  </Control.select>
                              </Col>
                      </Row>
                      <Row className='form-group'>
                          <Label htmlFor="author" md={12}>Your Name</Label>
                          <Col md={12}>
                              <Control.text model=".author" id='author' name='author' placeholder='Your Name' 
                              className="form-control" 
                              validators={{
                                  minLength: minLength(3), maxLength: maxLength(15)
                              }} />
                              <Errors className='text-danger' model=".author" show="touched" 
                              messages={{
                                  minLength: 'Must be greater than 2 characters.',
                                  maxLength: 'Must be 15 characters or less.'
                              }}
                              />
                          </Col>
                      </Row>
                      <Row className='form-group'>
                          <Label htmlFor="message" md={2}>Comment</Label>
                          <Col md={12}>
                              <Control.textarea model=".comment" id='comment' name='comment' rows="6"
                              className='form-control'/>
                          </Col>
                      </Row>
                      <Row className='form-group'>
                          <Col>
                              <Button type='submit' color='primary'>Submit</Button>
                          </Col>
                      </Row>
                  </LocalForm>
              </ModalBody>

          </Modal>
          </React.Fragment>
      );
  }
}

//CommentForm Class end


function RenderDish({ dish }) {
  if (dish) {
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>
              <h5>{dish.name}</h5>
            </CardTitle>
            <CardText> {dish.description} </CardText>
          </CardBody>
        </Card>
      </div>
    );
  } else {
    return <div></div>;
  }
}

function RenderComments({comments, addComment, dishId}) {
  if (comments) {
    const localComments = comments.map((comment) => {
      return (
        <li key={comment.id}>
          <p>{comment.comment}</p>
          <p>
            -- {comment.author}, &nbsp;
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "2-digit",
            }).format(new Date(Date.parse(comment.date)))}
          </p>
        </li>
      );
    });
    return (
      <div className="col-12 col-md-5 m-1">
        <h4> Comments </h4>
        <ul className="list-unstyled">{localComments}</ul>
        <CommentForm dishId={dishId} addComment={addComment} />
      </div>
    );
  } else {
    return <div></div>;
  }
}

const DishDetail = (props) => {
  if (props.dish === null) {
    return <div></div>;
  }

  const selectedDishItem = <RenderDish dish={props.dish} />;
  const selectedDishComments = <RenderComments comments={props.comments}
                                          addComment={props.addComment}
                                          dishId={props.dish.id}
                                        />

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem active><Link to='/home'>Home</Link></BreadcrumbItem>
          <BreadcrumbItem active><Link to='/menu'>Menu</Link></BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        {selectedDishItem}
        {selectedDishComments}
      </div>
    </div>
  );
};

export default DishDetail;
