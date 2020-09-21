import React from 'react';

import classes from './Order.module.css';

const Order = ({price, ingredients}) => {
    const ingredientsArr = [];

    for (let ingName in ingredients) {
        ingredientsArr.push({
            amount: ingredients[ingName],
            name: ingName
        })
    }

    const ingredientOutput = ingredientsArr.map( ig => (
        <span
            key={ig.name}
            style={{textTransform: 'capitalize', 
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #000',
            padding: '5px'
    }}
        >
            {ig.name} ({ig.amount})</span>
    ))

    return (
        <div className={ classes.Order }>
            <p>Ingredients: { ingredientOutput }</p>
            <p>Price: <strong>{ Number.parseFloat(price).toFixed(2)}</strong></p>
        </div>
    )
};

export default Order;