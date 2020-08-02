import React, { Component } from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.childre !== this.props.children;
    }

    render() {
        const { show, modalClosed, children, } = this.props;
        return (
            <>
                <Backdrop 
                    show={ show }
                    clicked={ modalClosed }
                />
                <div 
                    className={ classes.Modal }
                    style={{
                        transform: show ? 'translateY(0)' : 'translateY(-1000vh)',
                        opacite: show ? '1' : '0'
                    }}
                >                    
                    { children }
                </div>
            </>
        )
    }
}

export default Modal;