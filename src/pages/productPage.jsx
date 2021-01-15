import React from "react";
import { Card, Col, Container, Row, Nav, Button, Image, ListGroup } from "react-bootstrap";
import { getFunction, putFunction, postFunction, deleteFunction } from "../components/CRUDfunctions";
import uniqid from "uniqid";
import { withRouter } from "react-router-dom";

class ProductPage extends React.Component {
  state = {
    reviews: [
      {
        comment: "test",
        rate: 3,
        elementId: this.props.match.params.id,
      },
      {
        comment: "test",
        rate: 3,
        elementId: this.props.match.params.id,
      },
    ],
    product: {
      _id: "60015ff562e608230af359fb",
      name: "app test 1",
      description: "somthing longer",
      brand: "nokia",
      imageUrl: "https://drop.ndtv.com/TECH/product_database/images/2152017124957PM_635_nokia_3310.jpeg?downsize=*:420&output-quality=80",
      price: 100,
      category: "smartphones",
      createdAt: "2021-01-15T09:27:17.429Z",
      updatedAt: "2021-01-15T09:27:17.429Z",
      __v: 0,
    },
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
    if (reviews) {
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
  addToCart = async (e, id) => {
    let result = await postFunction("/carts/5f6b1991df85440017160811/add-to-cart/" + id, {});

    if (result) {
      this.setState({ alert: "Product Added to cart" });
      this.getCart();
    } else {
      console.log(result);
      this.setState({ style: "denger" });
    }
  };
  render() {
    const { name, description, brand, imageUrl, price, category, _id } = this.state.product;
    console.log(this.state.reviews);

    return (
      <Container>
        <Row>
          <Col>
            <Image as={Col} className='w-100 mt-5' variant='top' src={imageUrl} />
          </Col>
          <Col>
            <div className='mt-5 mb-0' xs={3} id='name-col'>
              <h3 className='title text-capitalize'>{name}</h3>
              <Row>
                <Col sm={2}>
                  <small className='text-muted'>Description:</small>
                </Col>
                <Col>
                  <b>{description}</b>
                </Col>
              </Row>
              <Row>
                <Col sm={2}>
                  <small className='text-muted'>Brand:</small>
                </Col>
                <Col>
                  <b>{brand}</b>
                </Col>
              </Row>
              <Row>
                <Col sm={2}>
                  <small className='text-muted'>Price:</small>
                </Col>
                <Col>
                  <b>${price}</b>
                </Col>
              </Row>
              <Row className='justify-content-center'>
                <b>{category}</b>
              </Row>
              <Button className='mt-4' variant='warning' onClick={() => this.addToCart(_id)}>
                Add to cart <i class='fa fa-cart-plus' aria-hidden='true'></i>
              </Button>

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
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(ProductPage);
