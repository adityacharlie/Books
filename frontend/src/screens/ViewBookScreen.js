import React, { useEffect, useState } from "react";
import BaseScreen from "./BaseScreen";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function ViewBookScreen(props) {
  let history = useHistory();

  const [book, setBook] = useState([]);

  let { id } = useParams();

  useEffect(() => {
    axios
      .get("/books/" + id)
      .then((response) => {
        console.log(response.data);
        setBook(response.data);
        console.log("View book response", response);
      })
      .catch((error) => {
        console.log("View book error", error.response);
        toast(
          "Error Viewing Book.Please try Again." + error.response.statusText
        );
        history.push("/");
      });
  });

  return (
    <BaseScreen>
      <Container fluid>
        <Row>
          <Col sm={6}>
            <h2> View Book </h2>
          </Col>
        </Row>
        <Row>
          <Col sm={2}></Col>
          <Col sm={8}>
            <Table striped bordered hover>
              <thead></thead>
              <tbody>
                <tr>
                  <td>Id</td>
                  <td>{book.id}</td>
                </tr>
                <tr>
                  <td>Title</td>
                  <td>{book.title}</td>
                </tr>
                <tr>
                  <td>Author</td>
                  <td>{book.author}</td>
                </tr>
                <tr>
                  <td>Publisher</td>
                  <td>{book.publisher}</td>
                </tr>
                <tr>
                  <td>Genre</td>
                  <td>{book.genre}</td>
                </tr>
                <tr>
                  <td>Quantity</td>
                  <td>{book.quantity}</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </BaseScreen>
  );
}
