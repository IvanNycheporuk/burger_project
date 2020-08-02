import React from 'react';

import Button from '../../UI/Button/Button';

const OrderSummary = ({ ingredients, totalSum, purchaseCancelled, purchaseContinue }) => {
    const ingredientSummary = Object.keys(ingredients)
        .map(igKey => (
            <li key={ igKey }><span style={{textTransform: 'capitalize'}}>{ igKey }</span>: { ingredients[igKey] }</li>
        ))

    return (
        <>
            <h3>Your order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                { ingredientSummary }
            </ul>
            <p>Total price: <strong>{ totalSum.toFixed(2) }</strong></p>
            <p>Continue to checkout?</p>
            <Button clicked={ purchaseCancelled } btnType="Danger">CANCEL</Button>
            <Button clicked={ purchaseContinue } btnType="Success">CONTINUE</Button>
        </>
    )
};

export default OrderSummary;