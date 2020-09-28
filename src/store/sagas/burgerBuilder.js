import { put } from 'redux-saga/effects';

import axios from '../../axios-orders';
import * as actions from '../actions';

export function* initIngredinetsSaga() {
    try {
        const respone = yield axios.get('https://burger-app-95251.firebaseio.com/ingredinets.json');
        yield put(actions.setIngredinets(respone.data))
    } catch (error) {
        yield put(actions.fetchIngredientsFailed())
    }
}