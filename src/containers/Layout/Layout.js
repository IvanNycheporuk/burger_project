import React, { Component } from 'react';

import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => ({showSideDrawer: !prevState.showSideDrawer}))
    }

    render() {
        const { children } = this.props;
        const { sideDrawerClosedHandler, sideDrawerToggleHandler } = this;
        const { showSideDrawer } = this.state;

        return (
            <>    
                <Toolbar                     
                    showMenu={ sideDrawerToggleHandler }
                />
                <SideDrawer 
                    open={ showSideDrawer } 
                    closed={ sideDrawerClosedHandler } 
                />
                <main className={ classes.Content }>
                    { children }
                </main>        
            </>
        )
    }
}

export default Layout;