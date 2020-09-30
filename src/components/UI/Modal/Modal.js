import React from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const Modal = ({ show, modalClosed, children }) => {
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

export default React.memo(
    Modal, 
    (prevProps, nextProps) => 
    nextProps.show === prevProps.show && 
    nextProps.children === prevProps.children);