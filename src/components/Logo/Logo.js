import React from 'react';
import classes from './Logo.module.css';

import burgerLogo from '../../assets/images/burger-logo.png';

const Logo = ({ height }) => (
    <div className={ classes.Logo } style={{height: height}}>
        <img src={ burgerLogo } alt="burger" />
    </div>
);

export default Logo;