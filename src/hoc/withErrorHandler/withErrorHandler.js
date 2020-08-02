import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = ( WrapperComponent, axios ) => {
    console.log(axios);

    return class extends Component {
        state = {
            error: null
        }

        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({  error: error });
            })
        }

        componentWillUnmount() {
            console.log('asdasds', this.reqInterceptor, this.resInterceptor)
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({ error: null })
        }

        render() {
            const { errorConfirmedHandler, props } = this;
            let { error } = this.state;

            return (
                <>
                    <Modal 
                        modalClosed={ errorConfirmedHandler }
                        show={ error }
                    >
                        { error ? error.message : null }
                    </Modal>
                    <WrapperComponent { ...props } />
                </>
            )
        }
    } 
}

export default withErrorHandler;