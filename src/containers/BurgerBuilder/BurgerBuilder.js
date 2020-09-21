import React, { Component } from 'react';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

import * as actions from '../../store/actions/';

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    updatePurchaseState = ( ingredients ) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    componentDidMount() {
        this.props.onInitIngredinets();
    }

    render() {
        const { purchasing } = this.state;
        const { purchaseContinueHandler, purchaseCancelHandler, purchaseHandler, updatePurchaseState } = this;
        const { 
            ings, totalPrice, error,
            onIngredientRemoved, onIngredientAdded
        } = this.props;
        
        let disabledInfo = {
            ...ings
        }
        for (let item in disabledInfo) {
            disabledInfo[item] = disabledInfo[item] <= 0
        }

        let orderSummary = null;
        let burger = error ? <p>ingredinets cant be loaded</p> : <Spinner />

        if ( ings ) {
            orderSummary = <OrderSummary 
                ingredients={ ings } 
                totalSum={ totalPrice }
                purchaseCancelled={ purchaseCancelHandler }
                purchaseContinue={ purchaseContinueHandler }
            />

            burger = (
                <>
                    <Burger ingredients={ ings } />
                    <BuildControls 
                        ingredientAdded={ onIngredientAdded }
                        ingredientRemoved={ onIngredientRemoved }
                        disabled={ disabledInfo }
                        price={ totalPrice }
                        purchasable={ updatePurchaseState(ings) }
                        ordered={ purchaseHandler }
                    />
                </>
            );
        }

        return (
            <>
                <Modal show={ purchasing } modalClosed={ purchaseCancelHandler }>
                    { orderSummary }
                </Modal>
                { burger }
            </>            
        );
    }
}

const mapStateToProps = state => ({
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
})

const mapDispatchToProps = dispatch => ({
    onIngredientAdded: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => dispatch(actions.removeIngredient(ingName)),
    onInitIngredinets: () => dispatch(actions.initIngredinets()),
    onInitPurchase: () => dispatch(actions.purchaseInit())
}) 

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));