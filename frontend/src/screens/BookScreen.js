import React, { useState, useEffect } from "react";
import BaseScreen from "./BaseScreen";
import axios from "axios";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function BookScreen(props) {
  const [books, setBooks] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    axios
      .get("/books/")
      .then((response) => {
        console.log(response.data);
        setBooks(response.data);
      })
      .finally(() => {});
  }, []);

  return (
    <BaseScreen>
      <Container fluid>
        <Row>
          <Col sm={2}></Col>
          <Col sm={8}>
            <div>
              <Row>
                <Col sm={6}>
                  <h2> Books </h2>
                </Col>
                <Col sm={6}>
                  <Link to={`/addbook`}>
                    <Button variant="outline-primary">Add Book</Button>
                  </Link>
                </Col>
              </Row>
              <Table striped bordered hover responsive="md">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Publisher</th>
                    <th>Genre</th>
                    <th>Quantity</th>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {books.map((book) => (
                    <tr key={book.id}>
                      <td>{book.id}</td>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td>{book.publisher}</td>
                      <td>{book.genre}</td>
                      <td>{book.quantity}</td>
                      <td>
                        <Link to={"/viewbook/" + book.id}>View</Link>
                      </td>
                      <td>
                        <Link to={"/editbook/" + book.id}>Edit</Link>
                      </td>
                      <td>
                        {/*<Link to={"/deletebook/" + book.id}>Delete</Link>*/}
                        <Button variant="primary" onClick={handleShow}>
                          delete
                        </Button>
                        <Modal show={show} onHide={handleClose}>
                          <Modal.Header closeButton>
                            <Modal.Title>Confirm</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            Are you sure you want to delete the book !
                          </Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              No
                            </Button>
                            <Button variant="primary" onClick={handleClose}>
                              <Link to={"/deletebook/" + book.id}>Yes</Link>
                            </Button>
                          </Modal.Footer>
                        </Modal>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
          <Col sm={2}></Col>
        </Row>
      </Container>
    </BaseScreen>
  );
}
