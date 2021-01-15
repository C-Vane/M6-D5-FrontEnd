import React from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { getFunction, putFunction, postFunction, deleteFunction } from "../components/CRUDfunctions";
import ProductTable from "../components/ProductsTable";

class BackOffice extends React.Component {
  state = {
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
    if (products) {
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
  editProduct = (prod) => this.setState({ currentProduct: prod });
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
          <ProductTable deleteProduct={this.deleteModal} editProduct={this.editProduct} products={this.state.products} />
        </div>
      </Container>
    );
  }
}

export default BackOffice;
