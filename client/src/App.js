import logo from './logo.svg';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import Home from './components/home';
import Signup from './components/signup';
import Signin from './components/signin';
import Orders from './components/orders';
import Product from './components/product'

import Navigationbar from './components/navbar';
import Cart from './components/cart';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { useState } from 'react';
function App() {
  const [items, setItems] = useState(null);
  return (
    <Router>
      <div>
        <Navigationbar items={items} setItems={setItems}/>
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home items={items} setItems={setItems}/>
        </Route>
          
        <Route exact path="/signup">
          <Signup />
        </Route>

        <Route exact path="/signin">
          <Signin />
        </Route>

        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/product">
          <Product />
        </Route>
        <Route exact path="/orders">
          <Orders />
        </Route>
      </Switch>
    </div>
    </div>
    </Router>
  );
}

export default App;
