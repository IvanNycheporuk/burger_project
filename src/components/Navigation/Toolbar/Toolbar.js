import React from 'react';

import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = ({ showMenu, isAuth }) => (
    <header className={ classes.Toolbar }>
        <DrawerToggle click={ showMenu } />       
        <Logo height="80%" />
        <nav className={ classes.DesktopOnly }>
            <NavigationItems isAuth={isAuth} />
        </nav>
    </header>
);

export default Toolbar;