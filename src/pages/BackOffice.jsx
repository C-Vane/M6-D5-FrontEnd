import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { getFunction, putFunction, postFunction, deleteFunction } from "../components/CRUDfunctions";
import ProductTable from "../components/ProductsTable";

class BackOffice extends React.Component {
  state = {
    products: [],
    loading: true,
    status: "",
    currentProduct: {
      name: "",
      description: "",
      brand: "",
      category: "",
      price: 0,
    },
    edit: false,
  };
  componentDidMount = () => {
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
  postProduct = async (e) => {
    e.preventDefault();
    let result = await postFunction("/products", this.state.currentProduct);
    if (result) {
      this.setState({
        currentProduct: {
          name: "",
          description: "",
          brand: "",
          category: "",
          price: 0,
        },
        status: "Product Added",
        loading: false,
      });
    } else {
      this.setState({ status: result });
    }
  };
  editProduct = () => {};
  putProduct = async (e) => {
    e.preventDefault();
    let result = await putFunction("/products", this.state.currentProduct);
    if (result) {
      this.setState({
        currentProduct: {
          name: "",
          description: "",
          brand: "",
          category: "",
          price: 0,
        },
        status: "Product Edited",
        loading: false,
      });
      this.getProducts();
    } else {
      this.setState({ status: result });
    }
  };
  deleteProducts = async (id) => {
    let result = await deleteFunction("/products/" + id);
    if (result) {
      this.setState({ status: "Product Deleted", loading: false });
      this.getProducts();
    } else {
      this.setState({ status: result });
    }
  };
  handleChange = (e) => {
    let currentProduct = { ...this.state.currentProduct };
    let current = e.currentTarget.id;
    currentProduct[current] = e.currentTarget.value;
    this.setState({ currentProduct });
  };
  render() {
    const { edit, currentProduct } = this.state;
    return (
      <Container>
        <h1>Back Office</h1>
        <Form onSubmit={edit ? this.putProduct : this.postProduct} className='w-50 m-auto'>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Name
            </Form.Label>
            <Col sm={10}>
              <Form.Control type='text' id='name' placeholder='Name of the product' value={currentProduct.name} onChange={this.handleChange} required />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Description
            </Form.Label>
            <Col sm={10}>
              <Form.Control type='text' id='description' as='textarea' placeholder='Description of the product' value={currentProduct.description} onChange={this.handleChange} required />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Brand
            </Form.Label>
            <Col sm={10}>
              <Form.Control type='text' id='brand' placeholder='Brand of the product' value={currentProduct.brand} onChange={this.handleChange} required />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Category
            </Form.Label>
            <Col sm={10}>
              <Form.Control type='text' id='category' placeholder='Category of the product' value={currentProduct.category} onChange={this.handleChange} required />
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm={2}>
              Price
            </Form.Label>
            <Col sm={10}>
              <Form.Control type='currency' id='price' placeholder='Price of the product' value={currentProduct.price} onChange={this.handleChange} required />
            </Col>
          </Form.Group>
          <Button variant='dark' type='submit'>
            Submit
          </Button>
        </Form>

        <div className='mt-5'>
          <ProductTable deleteProduct={this.deleteProducts} editProduct={this.editProduct} products={this.state.products} />
        </div>
      </Container>
    );
  }
}

export default BackOffice;
