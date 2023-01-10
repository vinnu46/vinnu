
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useEffect } from 'react';
import './home.css';
import { useState } from "react";
import axios from 'axios';
import { Redirect,useHistory } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Alert } from 'react-bootstrap';


const Home = ({ items, setItems }) => {
  const [successAlertVisibility, setSuccessAlertVisibility] = useState(false)
  const history = useHistory();

  const getItems = () => {
    return axios.get(process.env.REACT_APP_URL+`/item`)
      .then((response) => setItems(response.data));
  }

  const filterItems = (event) => {
    event.preventDefault();
    var name = event.target['name'].value;
    var brand = event.target['brand'].value;
    var min = event.target['min'].value;
    var max = event.target['max'].value;

    return axios.get(process.env.REACT_APP_URL+`/item?name=${name}&brand=${brand}&min=${min}&max=${max}`)
      .then((response) => setItems(response.data));
  }

  const addItem = (e,itemID) => {
    e.stopPropagation();
    // event.preventDefault();
    const config = {
      headers: {
        authorization: localStorage.getItem('accessToken')
      }
    };
    const itemData = {
      itemID: itemID
    }
    console.log(itemID);
    axios.post(process.env.REACT_APP_URL+'/cart/add', itemData, config).then((response) => {
      console.log(response.data);
      setSuccessAlertVisibility(true)
      setTimeout(() => setSuccessAlertVisibility(false), 1000)
    })
      .catch((error) => document.location='/signin')
  }

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Brand href="#">filter</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Filter
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                </Nav>
                <Form className="col search" onSubmit={filterItems}>
                  <Form.Control
                    type="search"
                    placeholder="Name"
                    className="me-2"
                    aria-label="Search"
                    name='name'
                  />
                  <Form.Control
                    type="search"
                    placeholder="Brand"
                    className="me-2"
                    aria-label="Search"
                    name='brand'
                  />
                  <Form.Control
                    type="search"
                    placeholder="Min Price"
                    className="me-2"
                    aria-label="Search"
                    name='min'
                  />
                  <Form.Control
                    type="search"
                    placeholder="Max Price"
                    className="me-2"
                    aria-label="Search"
                    name='max'
                  />
                  <Button variant="outline-success" type='submit'>Search</Button>
                </Form>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
      <div className='products'>
        <Alert style={{ position: 'fixed', zIndex: 22, left: 10, bottom: 0 }} show={successAlertVisibility} variant='success'>Product added to Cart!</Alert>
        {items && items.map((item, id) => {
          return (
            <div className='product'>
              <Card onClick={()=>history.push({pathname:'/product',state: {item}})} className='product-card' style={{ width: '18rem' }}>
                <Card.Img variant="top" src={item.image} />
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    {item.price} LE
                  </Card.Text>
                  <Button className='btn' variant='danger' onClick={(e) => addItem(e,item.id)}>Add to Cart</Button>
                </Card.Body>
              </Card>
            </div>
          )
        })}
      </div>
    </>

  );
}

export default Home;