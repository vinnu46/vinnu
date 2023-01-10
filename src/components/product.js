import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useEffect } from 'react';
// import './home.css';
import './product.css'
import { useState } from "react";
import axios from 'axios';
import { InputGroup, Alert, Table } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
// import {  } from 'bootstrap';



const Product = () => {
    const location = useLocation();
    const [item, setItem] = useState([])
    let [product, setProduct] = useState([])
    const [successAlertVisibility, setSuccessAlertVisibility] = useState(false)
    const addItem = (itemID) => {

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
            .catch((error) => document.location='/signin');
    }

    const getProduct = () => {
        const config = {
            headers: {
                authorization: localStorage.getItem('accessToken')
            }
        };
        return axios.get(process.env.REACT_APP_URL+`/product`, config)
            .then((response) => {
                // setProduct(response.data);
                console.log(response.data);
            });
    }

    useEffect(() => {
        if (location.state?.item?.id) {
            setItem(location.state.item)
        } else {
            document.location.href = '/'
        }
        // getProduct();
    }, [location]);
    // return(<></>)
    return (
        <>
        <Alert style={{ position: 'fixed', zIndex: 22, left: 10, bottom: 0 }} show={successAlertVisibility} variant='success'>Product added to Cart!</Alert>
        <div className='product-container'>
            <div className='text-container'>
                <h5><strong>{item.name}</strong></h5>
                {/* <p>Doll</p> */}
                {/* <h6>Description</h6> */}
                <p><strong>Description: </strong>{item.description}</p>
                <h6>Price: {item.price}LE</h6>
                <Button className='btn-add-to-cart' variant='danger' onClick={() => addItem(item.id)}>Add to Cart</Button>

            </div>
            <div className='image-container'>
                <img src={item.image}></img>
            </div>
        </div>
        </>

    );
}

export default Product;