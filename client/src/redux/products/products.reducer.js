import productsTypes from './products.types';

const INITIAL_STATE = {
    product: [],

}

const productsReducer = (state=INITIAL_STATE, action) => {
  switch (action.type) {
      case productsTypes.SET_PRODUCTS:
          return {
              ...state,
              product: action.payload
          }
         
  
      default:
          return state
  }
}

export default productsReducer