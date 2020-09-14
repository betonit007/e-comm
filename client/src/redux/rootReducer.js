import { combineReducers } from 'redux'
import userReducer from './User/user.reducer'
import productsReducer from './products/products.reducer'


export default combineReducers({
    user: userReducer,
    productsData: productsReducer
})