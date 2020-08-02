import React, { Component } from 'react';

import axios from '../../axios-orders';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    updatePurchaseState = ( ingredients ) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        this.setState({
            purchasable: sum > 0
        })
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredinets = {
            ...this.state.ingredients
        };
        updatedIngredinets[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredinets
        })

        this.updatePurchaseState( updatedIngredinets );
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredinets = {
            ...this.state.ingredients
        };
        updatedIngredinets[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredinets
        });

        this.updatePurchaseState( updatedIngredinets );
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
        // alert('continue');
        this.setState({
            loading: true
        })
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Ivan',
                address: {
                    street: 'test',
                    country: 'Ukraine'
                },
                email: 'test@test.com',
                deliveryMethod: 'fastest'
            }
        }

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false,
                    purchasing: false
                })
            })
            .catch( error => {
                this.setState({
                    loading: false,
                    purchasing: false
                })
            });
    }

    componentDidMount() {
        axios.get('https://burger-app-95251.firebaseio.com/ingredinets.json')
            .then(res => {
                this.setState({
                    ingredients: res.data
                })
            })
            .catch(err => {
                this.setState({ error: true })
            });
    }

    render() {
        let { ingredients, totalPrice, purchasable, purchasing, loading, error } = this.state;
        const { addIngredientHandler, purchaseContinueHandler, purchaseCancelHandler, removeIngredientHandler, purchaseHandler } = this;

        let disabledInfo = {
            ...ingredients
        }
        for (let item in disabledInfo) {
            disabledInfo[item] = disabledInfo[item] <= 0
        }

        let orderSummary = null;
        let burger = error ? <p>ingredinets cant be loaded</p> : <Spinner />

        if ( ingredients ) {
            orderSummary = <OrderSummary 
                ingredients={ ingredients } 
                totalSum= { totalPrice }
                purchaseCancelled={purchaseCancelHandler }
                purchaseContinue={ purchaseContinueHandler }
            />

            burger = (
                <>
                    <Burger ingredients={ ingredients } />
                    <BuildControls 
                        ingredientAdded={ addIngredientHandler }
                        ingredientRemoved={ removeIngredientHandler }
                        disabled={ disabledInfo }
                        price={ totalPrice }
                        purchasable={ purchasable }
                        ordered={ purchaseHandler }
                    />
                </>
            );
            
            if ( loading ) {
                orderSummary = <Spinner />
            }
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

export default withErrorHandler(BurgerBuilder, axios);