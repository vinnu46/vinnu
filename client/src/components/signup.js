import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useHistory } from "react-router-dom";

import "./signup.css" 

const Signup = () => {

  const history = useHistory();
  const routeChangeSignin = () =>{ 
    let path = `/signin`; 
    history.push(path);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    console.log(event.target['name'].value);
    const userData = {
      username:event.target['username'].value,
      name:event.target['name'].value,
      password:event.target['password'].value,
      contactNum:event.target['contactNumber'].value,
      address:event.target['address'].value
    }
    axios.post(process.env.REACT_APP_URL+'/user/signup', userData).then((response) => {
      console.log(response.data);
      routeChangeSignin();
    })
    .catch((error) => console.log(error));
  };

  return (
<>    
      <h1 className='web-header'>العميد للالعاب</h1>
    <div className = "form-div">

    <Form className = "form" noValidate onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="name"
            name='name'
          />
        </Form.Group>

        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="address"
            name='address'
          />
        </Form.Group>
        
        <Form.Group as={Col} md="4" controlId="validationCustom03">
          <Form.Label>Contact number</Form.Label>
          <Form.Control 
            type="text"
            placeholder="+20 1234567890"
            name='contactNumber'
            required 
          />
        </Form.Group>
      </Row>
      
      
      <Row className="mb-3">        
        
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              name='username'  
              required
            />
          </InputGroup>
        </Form.Group>
        
        <Form.Group as={Col} md="4" controlId="validationCustom04">
          <Form.Label>Password</Form.Label>
          <Form.Control 
          type="password" 
          placeholder="password" 
          name='password' 
          required 
        /> 
        </Form.Group>  
        
        <Form.Group as={Col} md="4" controlId="validationCustom04">
          <Form.Label>Confirm your password</Form.Label>
          <Form.Control 
          type="password" 
          placeholder="Confirm password" 
          required 
        />
        <Form.Control.Feedback type="invalid">
            Not matched
          </Form.Control.Feedback>
        </Form.Group>  
      </Row>
      
      <Form.Group className="mb-3 sign-up-button">
      </Form.Group>
      <Button type="submit" >Sign-up</Button> 
    </Form>
    </div></>
  );
}

export default Signup;