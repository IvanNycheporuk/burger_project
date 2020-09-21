import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
    
    checkoutCancelledHandler = () => {
        this.props.history.goBack()
    }
    
    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        const { ingredients, purchased } = this.props;
        const { checkoutCancelledHandler, checkoutContinuedHandler } = this;
        const { path } = this.props.match;
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
                    <Route path={ path + '/contact-data' } component={ ContactData } />
                </>
            )
        }

        return (
            <div>
                { summary }                
            </div>
        )
    }
}

const mapStateToProps = state => ({
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased
})


export default connect(mapStateToProps)(Checkout);