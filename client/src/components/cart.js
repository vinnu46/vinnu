import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useEffect } from 'react';
// import './home.css';
import './cart.css'
import { useState } from "react";
import axios from 'axios';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { InputGroup, Alert } from 'react-bootstrap';
// import {  } from 'bootstrap';



const Cart = () => {
    let [items, setItems] = useState([]);
    const [promo, setPromo] = useState([])
    const [foundPromo, setFoundPromo] = useState(false)
    const [successAlertVisibility, setSuccessAlertVisibility] = useState(false)
    function getCartPrice(){
        const totalBeforePromotion = items.reduce((total,nextItem) => total + nextItem.numberOfItems * nextItem.item.price,0)
        let totalAfterPromotion = null
            if (foundPromo && foundPromo.minimumPaymentLimit <= totalBeforePromotion ){
                let totalDiscountAmount = ((totalBeforePromotion * (foundPromo.percentageDiscountAmount/100)) + foundPromo.rawDiscountAmount) <= foundPromo.maximumDiscountLimit   ? ((totalBeforePromotion * (foundPromo.percentageDiscountAmount/100)) + foundPromo.rawDiscountAmount) : foundPromo.maximumDiscountLimit
                totalAfterPromotion = totalBeforePromotion - totalDiscountAmount
            }
        if (!totalAfterPromotion) {
            totalAfterPromotion = totalBeforePromotion
        }
        return totalAfterPromotion
    }
    const handleCheckout = () => {
        const config = {
            headers: {
                authorization: localStorage.getItem('accessToken')
            }
        };
        axios.post(process.env.REACT_APP_URL+'/purchase', { promotionCodeID: foundPromo.id }, config).then(({ data }) => {
            window.location = '/orders'
        })
            .catch((error) => console.log(error));
    }
    const applyPromo = (e) => {
        const config = {
            headers: {
                authorization: localStorage.getItem('accessToken')
            }
        };
        axios.post(process.env.REACT_APP_URL+'/promotioncode', { promotionCode: promo }, config).then(({ data }) => {
            if (data.id) {
                setSuccessAlertVisibility(true)
                setFoundPromo(data)
            }
            setTimeout(() => {
                setSuccessAlertVisibility(false)
            }, 1500)
        })
            .catch((error) => console.log(error));
    }

    const removeItem = (itemID) => {
        const config = {
            headers: {
                authorization: localStorage.getItem('accessToken')
            }
        };
        const itemData = {
            itemID: itemID
        }
        console.log(itemID);
        axios.post(process.env.REACT_APP_URL+'/cart/remove', itemData, config).then((response) => {
            console.log(response.data);
            getItems()
        })
            .catch((error) => console.log(error));
    }
    const addItem = (itemID) => {
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
            getItems()
        })
            .catch((error) => console.log(error));
    }

    const getItems = () => {
        const config = {
            headers: {
                authorization: localStorage.getItem('accessToken')
            }
        };
        return axios.get(process.env.REACT_APP_URL+`/cart`, config)
            .then((response) => {
                setItems(response.data.cart);
                console.log(response.data);
            });
    }

    useEffect(() => {
        getItems();
    }, []);

    return (
        <div className='products-cart'>
            {items && items.map((item) => {
                item = { ...item, ...item.item }
                return (
                    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }} className='product'>
                        <Card style={{ padding: '5px', paddingRight: '30px', width: 'auto', display: 'flex', flexDirection: 'row' }}>
                            <Card.Img style={{ width: '100px', display: 'inline' }} variant="top" src={item.image} />
                            <Card.Body style={{ display: 'inline' }}>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Text>
                                    {item.price} LE
                                </Card.Text>
                            </Card.Body>
                            <Card.Text style={{ display: 'block', margin: '0px', marginRight: '5px', alignSelf: 'center' }}>
                                Total Items:&nbsp;&nbsp;
                                <span style={{ fontWeight: 600, }}>
                                    {item.numberOfItems}
                                </span>
                            </Card.Text >
                            <div className='btns-container'>
                                <Button className='btn-add' variant='success' onClick={() => addItem(item.id)}>+</Button>
                                <Button className='btn-remove' variant='danger' onClick={() => removeItem(item.id)}>-</Button>

                            </div>

                        </Card>

                    </div>
                )
            })}
            <Alert show={successAlertVisibility} variant='success'>Promo Code applied successfully!</Alert>
            {items.length ? <div className='price-container'>
                <InputGroup style={{ width: '220px' }} className="mb-3">
                    <Form.Control
                        disabled={foundPromo}
                        placeholder="Promo code"
                        aria-label="Promo code"
                        aria-describedby="basic-addon2"
                        onChange={(e) => setPromo(e.target.value)}
                    />
                    {foundPromo == false ? <Button className='apply-button' onClick={(e) => applyPromo(e)} variant="outline-secondary" id="button-addon2">
                        Apply
                    </Button> : <Button className='apply-button' onClick={(e) => setFoundPromo(false)} variant="outline-secondary" id="button-addon2">
                        Cancel
                    </Button>}

                </InputGroup>
                <div>
                    <p className='total-price'>Total Price</p>
                    <p className='price'>{getCartPrice().toFixed(2)} LE</p>
                </div>
            </div> : <p>Your cart is empty</p>}
            <div>
                <Button disabled={items.length == 0} onClick={handleCheckout} style={{ padding: '8px 30px' }} stylesvariant="primary" type='submit'>Checkout</Button>
            </div>
        </div>
    );
}

export default Cart;