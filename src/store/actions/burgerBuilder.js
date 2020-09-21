import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (name) => ({
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: name
});

export const removeIngredient = (name) => ({
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
});

export const setIngredinets = (ingredients) => ({
    type: actionTypes.SET_INGREDIENTS,
    ingredients: ingredients
})

export const fetchIngredientsFailed = () => ({
    type: actionTypes.FETCH_INGREDIENTS_FAILED
})

export const initIngredinets = () => {
    return dispatch => {
        axios.get('https://burger-app-95251.firebaseio.com/ingredinets.json')
            .then(res => {
                dispatch(setIngredinets(res.data))
            })
            .catch(err => {
                dispatch(fetchIngredientsFailed());
            });
    }
}