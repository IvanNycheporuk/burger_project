import React, { Component } from "react";
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render() {
        const { orders, loading } = this.props;
        
        let orderList = <Spinner />;
        if (!loading) {
            orderList = orders.map(order => (
                    <Order 
                        ingredients={ order.ingredients }
                        price={ order.price }
                        key={ order.id } />
                ))
            }
        
        return(
            <div>
                { orderList }
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
})

const mapStateToProps = state => ({
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));