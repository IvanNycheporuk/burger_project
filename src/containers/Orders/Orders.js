import React, { Component } from "react";
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    componentDidMount() {
        this.props.onFetchOrders();
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
    onFetchOrders: () => dispatch(actions.fetchOrders())
})

const mapStateToProps = state => ({
    orders: state.order.orders,
    loading: state.order.loading
})

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));