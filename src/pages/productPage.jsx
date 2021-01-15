import React from "react";
import { Card, Col, Container, Row, Nav, Button, Image, ListGroup } from "react-bootstrap";
import { getFunction, putFunction, postFunction, deleteFunction } from "..components/CRUDfunctions";
import uniqid from "uniqid";
import { withRouter } from "react-router-dom";

class ProductPage extends React.Component {
  state = {
    reviews: [],
    product: {},
    loading: true,
    status: "",
    currentReview: {
      comment: "",
      rate: 3,
      elementId: this.props.match.params.id,
    },
  };
  componentDidMount = () => {
    this.getProduct(this.props.match.params.id);
    this.getReviews(this.props.match.params.id);
  };
  getProduct = async (id) => {
    let product = await getFunction("/products/" + id);
    if (product) {
      this.setState({ product: product[0], loading: false });
    } else {
      this.setState({ status: "No product" });
    }
  };
  getReviews = async (id) => {
    let reviews = await getFunction("/reviews/" + id);
    if (reviews.length > 0) {
      this.setState({ reviews: reviews, loading: false });
    } else {
      this.setState({ status: "No reviews" });
    }
  };
  postReview = async (e) => {
    e.preventDefault();
    let result = await postFunction("/reviews", this.state.currentReview);
    if (result) {
      this.setState({ status: "review Added", loading: false });
    } else {
      this.setState({ status: result });
    }
  };
  putReview = async (e) => {
    e.preventDefault();
    let result = await putFunction("/reviews", this.state.currentReview);
    if (result) {
      this.setState({ status: "review Edited", loading: false });
    } else {
      this.setState({ status: result });
    }
  };
  deleteReviews = async (id) => {
    let result = await getFunction("/reviews/" + id);
    if (result) {
      this.setState({ status: "Review Deleted", loading: false });
    } else {
      this.setState({ status: result });
    }
  };
  render() {
    const { name, description, brand, image, price, category } = this.state.product;
    console.log(this.state.reviews);

    return (
      <Container>
        <div>
          <Image className='w-100 mt-5' variant='top' src={image} />
          <Container>
            <div className='mt-3 mb-0' xs={3} id='name-col'>
              <h3 className='title'>{name}</h3>

              <Card.Body>
                <Card.Text>
                  <small className='text-muted'>description:</small> <p>{description}</p>
                </Card.Text>
                <small className='d-flex justify-content-left'>Brand: {brand}</small>

                <Button variant='warning' size='sm'>
                  add to cart
                </Button>
                <Card>
                  <Card.Footer variant='light' bg='light'>
                    <small className='text-muted'>${price}</small>
                    <br></br>
                    <small>{category}</small>
                  </Card.Footer>
                </Card>
                {this.state.reviews.map((reviews) => {
                  const { comment, rate } = reviews;
                  <Card className='mt-1'>
                    <Card.Header>Comments</Card.Header>
                    <ListGroup variant='flush'>
                      <ListGroup.Item>
                        {rate}
                        {comment}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card>;
                })}
              </Card.Body>
            </div>
          </Container>
        </div>
      </Container>
    );
  }
}

export default withRouter(ProductPage);
