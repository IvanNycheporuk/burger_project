import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/';
import { updateObject, checkValidity } from '../../shared/utility';

const Auth = ({
    buildingBurger, authRedirectPath, loading, error, isAuth,
    onSetAuthRedirectPath, onAuth}
) => {
    const [controls, setControls] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Address'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        }
    });

    const [isSignup, setIsSignup] = useState(true);

    useEffect(() => {
        if (!buildingBurger && authRedirectPath !== '/') {
            onSetAuthRedirectPath();
        }  
    }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath])

    const inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(controls, {
            [controlName]: updateObject(controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, controls[controlName].validation),
                touched: true
            })
        })

        setControls(updatedControls);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        onAuth(controls.email.value, controls.password.value, isSignup);
    }

    const switchAuthModeHandler = () => {
        setIsSignup(!isSignup);
    }
    
    const formElementsArray = [];
    for ( let key in controls ) {
        formElementsArray.push( {
            id: key,
            config: controls[key]
        } );
    }

    let form = <Spinner />

    if (!loading) {
        form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => inputChangedHandler( event, formElement.id )} />
        ) );
    }

    let errorMsg = null;

    if (error) {
        errorMsg = (
            <p>{ error.message }</p>
        )
    }

    let authRedirect = null;
    if (isAuth) {
        authRedirect = <Redirect to={ authRedirectPath }/>
    }

    return (
        <div className={classes.Auth}>
            { authRedirect }
            { errorMsg }
            <form onSubmit={submitHandler}>
                { form }
                <Button btnType="Success">SUBMIT</Button>
            </form>
            <Button 
                btnType="Danger"
                clicked={switchAuthModeHandler}
                >
                    SWITCH TO { isSignup ? 'SIGN IN' : 'SIGN UP' }
            </Button>
        </div>
    );
    
}

const mapStateToProps = state => ({
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
})

const mapDispatchToProps = dispatch => ({
    onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
    onSetAuthRedirectPath: ()=> dispatch(actions.setAuthRedirectPath('/'))
})
export default connect(mapStateToProps, mapDispatchToProps)(Auth);