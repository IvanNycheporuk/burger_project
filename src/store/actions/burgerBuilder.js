import * as actionTypes from './actionTypes';

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

export const initIngredinets = () => ({
    type: actionTypes.INIT_INGREDIENTS
})
