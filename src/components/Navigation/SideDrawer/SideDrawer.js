import React from 'react';

import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = ({ closed, open, isAuth }) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if ( open ) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }

    return (
        <>
            <Backdrop show={ open } clicked={ closed }/>
            <div className={ attachedClasses.join(' ') }>                
                <div className={ classes.Logo }>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuth={ isAuth } />
                </nav>
            </div>
        </>        
    );
};

export default SideDrawer;