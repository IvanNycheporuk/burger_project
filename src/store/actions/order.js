import * as actionTypes from './actionTypes';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILED,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData, token) => ({
    type: actionTypes.PURCHASE_BURGER,
    orderData,
    token
});

export const purchaseInit = () => ({
    type: actionTypes.PURCHASE_INIT
})

export const fetchOrdersSuccess = (orders) => ({
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders: orders
})

export const fetchOrdersFail = (error) => ({
    type: actionTypes.FETCH_ORDERS_FAILED,
    error: error
})

export const fetchOrderStart = () => ({
    type: actionTypes.FETCH_ORDERS_START
})

export const fetchOrders = (token, userId) => ({
    type: actionTypes.FETCH_ORDERS,
    token,
    userId
})
