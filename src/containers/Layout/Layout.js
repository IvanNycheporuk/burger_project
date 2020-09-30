import React, { useState } from 'react';
import { connect } from 'react-redux';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

const Layout = ({ isAuth, children }) => {
    const [showSideDrawer, setShowSliderDrawer] = useState(false)

    const sideDrawerClosedHandler = () => {
        setShowSliderDrawer(false);
    }

    const sideDrawerToggleHandler = () => {
        setShowSliderDrawer(!showSideDrawer);
    }
    
    return (
        <>    
            <Toolbar  
                isAuth={ isAuth }                   
                showMenu={ sideDrawerToggleHandler }
            />
            <SideDrawer 
                isAuth={ isAuth } 
                open={ showSideDrawer } 
                closed={ sideDrawerClosedHandler } 
            />
            <main className={ classes.Content }>
                { children }
            </main>        
        </>
    )    
}

const mapStateToProps = state => ({
    isAuth: state.auth.token !== null
})

export default connect(mapStateToProps)(Layout);