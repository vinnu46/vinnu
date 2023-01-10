import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import React, { useEffect } from 'react';
// import './home.css';
import './cart.css'
import { useState } from "react";
import axios from 'axios';
import { Table } from 'react-bootstrap';
// import {  } from 'bootstrap';



const Orders = () => {
    let [orders, setOrders] = useState([])
    const getOrders = () => {
        const config = {
            headers: {
                authorization: localStorage.getItem('accessToken')
            }
        };
        return axios.get(process.env.REACT_APP_URL+`/purchase`, config)
            .then((response) => {
                setOrders(response.data);
                console.log(response.data);
            });
    }

    useEffect(() => {
        getOrders();
    }, []);
    // return(<></>)
    return (
        <div className='products-cart'>
                <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }} className='product'>
            <Table responsive="sm">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Order Status</th>
                            <th>Price Before Discount</th>
                            <th>Price After Discount</th>
                            <th>Delivery Status</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.map((order) => {
                            return (
                                <tr>
                                    <td>{order.id}</td>
                                    <td>Confirming...</td>
                                    <td>{order.totalBeforePromotion.toFixed(2)}</td>
                                    <td>{order.totalAfterPromotion.toFixed(2)}</td>
                                    <td>Not delivered</td>

                                </tr>
                            )
                        })}

                    </tbody>
            </Table>
                </div>
        </div>

    );
}

export default Orders;