import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = ({isAuth}) => (
    <ul className={ classes.NavigationItems }>
        <NavigationItem link="/" > Burger Builder </NavigationItem>
        { isAuth ? <NavigationItem link="/orders" > Orders </NavigationItem> : null }
        {
            !isAuth 
                ? <NavigationItem link="/auth" > Auth </NavigationItem>
                : <NavigationItem link="/logout" >Logout</NavigationItem>
        }
        
    </ul>
);

export default NavigationItems;