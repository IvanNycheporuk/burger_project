import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = ({ ingredients, purchased, match, history }) => {    
    const checkoutCancelledHandler = () => {
        history.goBack()
    }
    
    const checkoutContinuedHandler = () => {
        history.replace('/checkout/contact-data');
    }

    let summary = <Redirect to="/" />
    
    if (ingredients) {
        const purchasedRedirect = purchased ? <Redirect to="/" /> : null;
        summary = (
            <>
                { purchasedRedirect }
                <CheckoutSummary 
                    ingredients={ ingredients }
                    checkoutCancelled={ checkoutCancelledHandler }
                    checkoutContinued={ checkoutContinuedHandler }
                />
                <Route path={ match.path + '/contact-data' } component={ ContactData } />
            </>
        )
    }

    return (
        <div>
            { summary }                
        </div>
    )
}

const mapStateToProps = state => ({
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
});

export default connect(mapStateToProps)(Checkout);