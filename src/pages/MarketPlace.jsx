import React from "react";
import { Button, Card, Col, Container, Nav, Row } from "react-bootstrap";
import { getFunction, postFunction } from "../components/CRUDfunctions";
import uniqid from "uniqid";
import { Link, Router } from "react-router-dom";

class MarketPlace extends React.Component {
  state = {
    category: "",
    products: this.props.products || [],
    loading: true,
    style: "warning",
    cart: {
      products: [
        {
          _id: "6001606162e608230af359fc",
          name: "app test 2.2",
          description: "somthing longer",
          brand: "nokia",
          imageUrl: "https://drop.ndtv.com/TECH/product_database/images/2152017124957PM_635_nokia_3310.jpeg?downsize=*:420&output-quality=80",
          price: 100,
          category: "smartphones",
          createdAt: "2021-01-15T09:29:05.562Z",
          updatedAt: "2021-01-15T09:38:23.113Z",
          __v: 0,
        },
      ],
    },
  };
  componentDidMount = () => {
    this.getCart();
    this.getProducts();
  };
  componentDidUpdate = (prevProps) => {
    console.log(this.props.products);
    if (prevProps.products !== this.props.products) this.setState({ products: this.props.products || this.state.products });
  };
  getProducts = async () => {
    let products = await getFunction("/products");
    if (products) {
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
              const { name, description, brand, imageUrl, price, category } = product;
              return (
                <Col className='mt-5 mb-5' xs={4} md={3} key={uniqid()} id='name-col'>
                  <Card border={products && products.find((prod) => prod._id === product._id) ? "success" : "warning"} className='h-100'>
                    <Link to={"/market/" + product._id}>
                      <Card.Img className='w-100' variant='top' src={imageUrl} />
                    </Link>
                    <Card.Body>
                      <Card.Title className='title text-capitalize'>{name}</Card.Title>

                      <Card.Text>
                        <small className='text-muted'>description:</small> <p>{description}</p>
                      </Card.Text>
                      <small className='d-flex justify-content-left'>Brand: {brand}</small>
                    </Card.Body>
                    <Button variant={products && products.find((prod) => prod._id === product._id) ? "success" : "warning"} size='sm' onClick={(e) => this.addProduct(e, product.ID)}>
                      Add to Cart <i class='fa fa-cart-plus' aria-hidden='true'></i>
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
