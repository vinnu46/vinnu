import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useHistory } from "react-router-dom";

import "./signin.css" 

const Signin = () => {

  const history = useHistory();
  const routeChangeMain = () =>{ 
    let path = `/`; 
    history.push(path);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target['name'].value);
    const userData = {
      username:event.target['username'].value,
      password:event.target['password'].value
    }
    console.log(userData);
    axios.post(process.env.REACT_APP_URL+'/user/signin', userData).then((response) => {
      localStorage.setItem('accessToken', response.data.accessToken)
      console.log(localStorage.getItem('accessToken'));
      routeChangeMain();

    })
    .catch((error) => console.log(error));
  };

  return (    
    <>    
      <h1 className='web-header'>العميد للالعاب</h1>
    <div className = "form-div">
    <Form className = "form" noValidate onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="40" controlId="validationCustom01">
          <Form.Label>username</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="name"
            name='username'
          />
        </Form.Group>
        </Row>

        <Row className="mb-3">
        <Form.Group as={Col} md="40" controlId="validationCustom02">
          <Form.Label>password</Form.Label>
          <Form.Control
            required
            type="password"
            placeholder="password"
            name='password'
          />
        </Form.Group>
      </Row>
      
      <Form.Group className="mb-3 sign-in-button">
      </Form.Group>
      <Button type="submit" >login</Button> 
    </Form>
    </div>
    </>
  );
}

export default Signin;