import axios from 'axios';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useHistory } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './navbar.css';
import React, {useEffect} from 'react';
import Card from 'react-bootstrap/Card';
import { useState } from "react";

const Navigationbar = ({items,setItems}) => {
  
    const history = useHistory();
    const routeChangeSignin = () =>{ 
      let path = `/signin`; 
      history.push(path);
    }
    const routeChangeSignup = () =>{ 
        let path = `/signup`; 
        history.push(path);
    }

    const routeChangeCart = () =>{ 
      let path = `/cart`; 
      history.push(path);
  }

  const routeChangeHome = () =>{ 
    let path = `/`; 
    history.push(path);
}
const logOut=()=>{
  localStorage.removeItem('accessToken')
  document.location='/'
  // document.location.reload()
}

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(event.target['name'].value);
      axios.get(process.env.REACT_APP_URL+`/item?name=${event.target['name'].value}`).then((response) => {
        items = response.data;
        setItems(items);
      })
      .catch((error) => console.log(error));
    };

    return (  
      <>
      <Navbar bg="primary" variant="dark">
        <Navbar.Brand className='brand-name' style={{paddingLeft:'10px',cursor:'pointer'}} onClick={routeChangeHome}>العميد للالعاب</Navbar.Brand>
        <Nav className="me-auto">
          {!localStorage.getItem('accessToken')?
          <><Nav.Link onClick={routeChangeSignin}>singIn</Nav.Link>
          <Nav.Link onClick={routeChangeSignup}>signUp</Nav.Link></>:
          <><Nav.Link onClick={routeChangeCart}>cart</Nav.Link>
          <Nav.Link onClick={()=>history.push('/orders')}>orders</Nav.Link>
          </>}

        </Nav>
        <Form  className="col search-navbar" method='get' onSubmit={handleSubmit}>
                <Form.Control
                style={{height:'38px',alignSelf:'center'}}
                  type="search"
                  placeholder="Search..."
                  className="me-2"
                  aria-label="Search"
                  name="name"
                />
                <Button variant="danger" type='submit'>Search</Button>
              </Form>
        {localStorage.getItem('accessToken')?
        <Nav className="me-auto">
          <Nav.Link onClick={logOut}>Logout</Nav.Link>
          </Nav>:<></>}

    </Navbar>
    </>
  );
}
 
export default Navigationbar;