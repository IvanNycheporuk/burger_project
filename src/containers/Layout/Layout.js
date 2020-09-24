import React, { Component } from 'react';
import { connect } from 'react-redux';

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
                    isAuth={ this.props.isAuth }                   
                    showMenu={ sideDrawerToggleHandler }
                />
                <SideDrawer 
                    isAuth={ this.props.isAuth } 
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

const mapStateToProps = state => ({
    isAuth: state.auth.token !== null
})

export default connect(mapStateToProps)(Layout);