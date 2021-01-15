import React from "react";
import { Navbar, Nav, Container, Dropdown, Spinner, Image, Row, Col, Button } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { deleteFunction, getFunction } from "./CRUDfunctions";

class NavBar extends React.Component {
  state = {
    cart: {},
  };
  componentDidMount = () => {
    this.getCart();
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
        <Navbar bg='dark' variant='dark'>
          <Container>
            <Link to='/market'>
              <Navbar.Brand>
                <img alt='' src='https://strive.school/assets/strive_white.png' width='auto' height='30' className='d-inline-block align-top' /> Market
              </Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls='responsive-navbar-nav' />
            <Navbar.Collapse id='responsive-navbar-nav'>
              <Nav className='mr-auto'>
                <Link to='/market'>
                  <div className={this.props.location.pathname === "/market" ? "nav-link active" : "nav-link"}>Market</div>
                </Link>
              </Nav>
              {this.props.location.pathname !== "/backoffice" && (
                <Nav>
                  <Dropdown>
                    <Dropdown.Toggle variant='warning' id='dropdown-basic' onMouseDown={this.getCart}>
                      Shoping Cart
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ minWidth: "300px" }}>
                      {products && (
                        <Dropdown.Item>
                          {this.state.cart.name} {this.state.cart.surname}'s cart
                        </Dropdown.Item>
                      )}
                      {products ? (
                        products.map((product, key) => (
                          <div key={product.ID + key}>
                            <Row className='justify-content-around'>
                              <Col md={3}>
                                {" "}
                                <Image src={product.image} height='30px' />
                              </Col>
                              <Col md={4}>
                                <div>{product.name}</div>
                                <small>{product.descriptoin}</small>
                              </Col>
                              <Col md={3}>
                                {" "}
                                <div>${parseFloat(product.price).toFixed(2)}</div>
                              </Col>
                              <Col sm={1}>
                                <Button variant='danger' className='m-0 p-0 px-1' style={{ zIndex: "999" }} onClick={() => this.removeProduct(product.ID)}>
                                  X
                                </Button>
                              </Col>
                            </Row>
                          </div>
                        ))
                      ) : (
                        <Spinner></Spinner>
                      )}
                      <Dropdown.Divider />
                      <Dropdown.Item>
                        <Row className='justify-content-between mx-2'>
                          <div>Total</div>
                          <div className='font-weight-bold 2x'>${total ? total.toFixed(2) : "0,00"}</div>
                        </Row>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Nav>
              )}
              <Nav>
                <Dropdown>
                  <Dropdown.Toggle variant='dark' id='dropdown-basic'>
                    {" "}
                    Account
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Link to='/backoffice'>
                      <div className='text-black-50 text-decoration-none'> Back Office</div>
                    </Link>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>

              {/*   {this.props.location.pathname === "/projects" && (
              <Form inline onSubmit={this.handleSearch}>
                <Form.Control type='text' placeholder='Search' onInput={this.handleChange} value={this.state.search} className='mr-sm-2' />
                <Button variant='outline-dark' type='submit'>
                  Search
                </Button>
              </Form>
            )} */}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}

export default withRouter(NavBar);
