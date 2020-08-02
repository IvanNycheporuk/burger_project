import React from 'react';

import classes from './BuildControl.module.css';

const BuildControl = ({ label, added, removed, disabled }) => (
    <div className={ classes.BuildControl }>
        <div className={ classes.Label }>{ label }</div>
        <button 
            disabled={ disabled }
            className={ classes.Less }
            onClick={ removed }
        >Less</button>
        <button 
            className={ classes.More }
            onClick={ added }
        >More</button>
    </div>
)

export default BuildControl;