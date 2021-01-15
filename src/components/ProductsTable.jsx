import React from "react";
import { Button, Image, Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductTable = (props) => {
  const { products, editProduct, deleteProduct } = props;
  return (
    <Table striped bordered hover variant='dark'>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Description</th>
          <th>Brand</th>
          <th>Category</th>
          <th>Price</th>
          <th>Edit/Delete</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, i) => (
          <tr key={i}>
            <td>
              {i + 1} <Image src={product.image ? product.image : "https://thumbs.dreamstime.com/b/default-avatar-profile-image-vector-social-media-user-icon-potrait-182347582.jpg"} height='30px' />
            </td>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.brand}</td>
            <td>{product.category}</td>
            <td>{product.price}</td>
            <td>
              <Button variant='warning' onClick={() => editProduct(product.ID)}>
                Edit
              </Button>
              <Button onClick={() => deleteProduct(product.ID)} variant='danger'>
                Delete
              </Button>
              <Link to={"/projects/" + product.ID + "/" + product.name + " " + product.surname}>
                <Button> Projects</Button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProductTable;
