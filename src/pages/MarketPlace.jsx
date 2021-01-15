import React from "react";
import { Button, Card, Col, Container, Nav, Row } from "react-bootstrap";
import { getFunction, postFunction } from "..componenets/CRUDfunctions";
import uniqid from "uniqid";
import { Link, Router } from "react-router-dom";

class MarketPlace extends React.Component {
  state = {
    category: "",
    products: [],
    loading: true,
    style: "warning",
    cart: [],
  };
  componentDidMount = () => {
    this.getCart();
    this.getProducts();
  };
  getProducts = async () => {
    let products = await getFunction("/products");
    if (products.length > 0) {
      this.setState({ products, loading: false });
    } else {
      this.setState({ status: "No products" });
    }
  };
  getCart = async () => {
    const cart = await getFunction("/carts/5f6b1991df85440017160811");
    console.log(cart);
    if (cart) {
      this.setState({ cart: cart[0] });
    } else {
      console.log(cart);
    }
  };
  addProduct = async (e, id) => {
    console.log(id);
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
    const { products } = this.state.cart;
    return (
      <Container>
        <Row>
          {this.state.products.length > 0 &&
            this.state.products.map((product) => {
              const { name, description, brand, image, price, category } = product;
              return (
                <Col className='mt-5 mb-5' xs={3} key={uniqid()} id='name-col'>
                  <Card border={products && products.find((prod) => prod.ID === product.ID) ? "success" : "warning"}>
                    <Link to={"/market/" + product.ID}>
                      <Card.Img className='w-100' variant='top' src={image} />
                    </Link>
                    <Card.Body>
                      <Card.Title className='title'>{name}</Card.Title>

                      <Card.Text>
                        <small className='text-muted'>description:</small> <p>{description}</p>
                      </Card.Text>
                      <small className='d-flex justify-content-left'>Brand: {brand}</small>
                    </Card.Body>
                    <Button variant={products && products.find((prod) => prod.ID === product.ID) ? "success" : "warning"} size='sm' onClick={(e) => this.addProduct(e, product.ID)}>
                      add to cart
                    </Button>

                    <Card.Footer style={{ maxHeight: "60px" }}>
                      <small className='text-muted'>${price}</small>
                      <br></br>
                      <small>{category}</small>
                    </Card.Footer>
                  </Card>{" "}
                </Col>
              );
            })}
        </Row>
      </Container>
    );
  }
}

export default MarketPlace;
