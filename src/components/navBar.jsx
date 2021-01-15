import React from "react";
import { Navbar, Nav, Container, Dropdown, Spinner, Image, Row, Col, Button, Form, InputGroup, DropdownButton } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { deleteFunction, getFunction } from "./CRUDfunctions";

class NavBar extends React.Component {
  state = {
    cart: {
      products: [
        {
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
      total: 200,
    },
    search: "",
  };
  componentDidMount = () => {
    this.getCart();
  };
  getProducts = async (e) => {
    e.preventDefault();
    console.log("hello");
    const product = await getFunction("/products?search=" + this.state.search);
    if (true) {
      this.props.setProducts([
        {
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
      ]);
    } else {
      console.log(product);
    }
  };
  getCart = async () => {
    const cart = await getFunction("/carts/5f6b1991df85440017160811");
    if (cart) {
      this.setState({ cart: cart[0] });
    } else {
      console.log(cart);
    }
  };
  handleChange = (e) => this.setState({ search: e.target.value });
  removeProduct = async (id) => {
    console.log(id);
    const response = await deleteFunction("/carts/5f6b1991df85440017160811/remove-from-cart/" + id);
    if (response) {
      this.getCart();
    } else {
      console.log(response);
    }
  };
  render() {
    const { products, total } = this.state.cart;
    return (
      <div>
        <Navbar bg='dark' expand='lg'>
          <Link to='/'>
            <Navbar.Brand>
              <img alt='' src='https://www.nicepng.com/png/full/16-167642_amazon-logo-amazon-logo-white-text.png' width='auto' height='30' className='d-inline-block align-top' /> .de
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            {this.props.location.pathname !== "/backoffice" && (
              <div className='d-flex justify-content-around w-100'>
                <Nav className='mr-auto'>
                  <div>
                    <span className='text-muted'>Deliver To Vanessa</span>
                    <div className={this.props.location.pathname === "/" ? "nav-link active mt-0 pt-0" : "nav-link  mt-0 pt-0"}>
                      <b>Freiburg ... 79100</b>
                    </div>
                  </div>
                </Nav>

                <Form inline onSubmit={this.getProducts} className='w-50'>
                  <InputGroup className='mb-2 w-100'>
                    <InputGroup.Prepend>
                      <Dropdown.Toggle variant='light' id='dropdown-basic'>
                        All
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href='#/action-1'>Action</Dropdown.Item>
                        <Dropdown.Item href='#/action-2'>Another action</Dropdown.Item>
                        <Dropdown.Item href='#/action-3'>Something else</Dropdown.Item>
                      </Dropdown.Menu>
                    </InputGroup.Prepend>
                    <Form.Control type='text' placeholder='Search' onInput={this.handleChange} value={this.state.search} />
                    <InputGroup.Append>
                      <Button variant='warning' type='submit'>
                        <i class='fa fa-search' aria-hidden='true'></i>
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </Form>

                <Dropdown className='w-25'>
                  <Dropdown.Toggle variant='warning' id='dropdown-basic' className='mt-1' onMouseDown={this.getCart}>
                    Shoping Cart
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{ minWidth: "300px" }}>
                    {products && (
                      <Dropdown.Item>
                        {this.state.cart.name} {this.state.cart.surname}'s cart
                      </Dropdown.Item>
                    )}
                    <Dropdown.Item>
                      <Container>
                        {products ? (
                          products.map((product, key) => (
                            <Row className='justify-content-around' key={product._id + key}>
                              <Col sm={3}>
                                {" "}
                                <Image src={product.imageUrl} height='30px' />
                              </Col>
                              <Col sm={4}>
                                <div>{product.name}</div>
                                <small>{product.descriptoin}</small>
                              </Col>
                              <Col sm={3}>
                                {" "}
                                <div>${parseFloat(product.price).toFixed(2)}</div>
                              </Col>
                              <Col sm={1}>
                                <Button variant='danger' className='m-0 p-0 px-1' style={{ zIndex: "999" }} onClick={() => this.removeProduct(product.ID)}>
                                  X
                                </Button>
                              </Col>
                            </Row>
                          ))
                        ) : (
                          <Spinner></Spinner>
                        )}
                      </Container>
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                      <Row className='justify-content-between mx-2'>
                        <div>Total</div>
                        <div className='font-weight-bold 2x'>${total ? total.toFixed(2) : "0,00"}</div>
                      </Row>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
            <Nav>
              <DropdownButton title='Account' drop='left'>
                <Dropdown.Item>
                  <Link to='/backoffice'>
                    <div className='text-black-50 text-decoration-none'> Back Office</div>
                  </Link>
                </Dropdown.Item>
                <Dropdown.Item>
                  <Link to='/'>
                    <div className='text-black-50 text-decoration-none'> Market Place</div>
                  </Link>
                </Dropdown.Item>
              </DropdownButton>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(NavBar);
