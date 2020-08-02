import React from 'react';

import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = ({ ingredients }) => {
    let transfromedIngredients = Object.keys( ingredients )
        .map(igKey => {
            return [...Array(ingredients[igKey])].map( (_, i) => (
                <BurgerIngredient key={ igKey + i } type={ igKey } />
            ))
        })
        .reduce( (arr, el) => {
            return arr.concat(el);
        }, []);

    if ( transfromedIngredients.length === 0) {
        transfromedIngredients = <p>please add ingredients</p>
    }

    return (
        <div className={ classes.Burger }>
            <BurgerIngredient type="bread-top" />
            { transfromedIngredients }
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default Burger;