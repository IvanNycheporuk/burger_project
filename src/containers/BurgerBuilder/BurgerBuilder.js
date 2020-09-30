import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

import * as actions from '../../store/actions/';

const BurgerBuilder = ({ history }) => {
    const [purchasing, setPurchasing] = useState(false);
    
    const ings = useSelector(state => state.burgerBuilder.ingredients);
    const totalPrice = useSelector(state => state.burgerBuilder.totalPrice);
    const error = useSelector(state => state.burgerBuilder.error);
    const isAuth = useSelector(state => state.auth.token !== null)
    
    const dispatch = useDispatch();
    const onIngredientAdded = (ingName) => dispatch(actions.addIngredient(ingName));
    const onIngredientRemoved = (ingName) => dispatch(actions.removeIngredient(ingName));
    const onInitIngredinets = useCallback(() => dispatch(actions.initIngredinets()), [dispatch]);
    const onInitPurchase = () => dispatch(actions.purchaseInit());
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path));
    
    useEffect(() => {
        onInitIngredinets();
    }, [onInitIngredinets]);

    const updatePurchaseState = ( ingredients ) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    }

    const purchaseHandler = () => {
        if (isAuth) {
            setPurchasing(true);
        } else {
            onSetAuthRedirectPath('/checkout');
            history.push('/auth')
        }        
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false);
    }

    const purchaseContinueHandler = () => {
        onInitPurchase();
        history.push('/checkout');
    }    
         
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
                    isAuth={ isAuth }
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

export default withErrorHandler(BurgerBuilder, axios);