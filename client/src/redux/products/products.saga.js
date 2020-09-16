import { auth } from '../../firebase/config'
import { takeLatest, put, all, call } from 'redux-saga/effects'
import { setProducts, fetchProductsStart } from './products.actions'
import productsTypes from './products.types'
import { handleAddProduct, handleFetchProducts, handleDeleteProduct } from './products.helpers'

export function* addProduct({ payload: {
    productCategory,
    productName,
    productThumbnail,
    productPrice
} }) {
    console.log(productCategory, productName, productThumbnail, productPrice)
  try {
      yield handleAddProduct({
        productCategory,
        productName,
        productThumbnail,
        productPrice,
        productAdminUserUID: auth.currentUser.uid,
        createdDate: new Date()
      })
      yield put(
          fetchProductsStart()
      )
  } catch (err) {
      console.log(err)
  }
}

export function* onAddProductStart() {
    yield takeLatest(productsTypes.ADD_NEW_PRODUCT_START, addProduct)
}

export function* fetchProducts({ payload }) {
    console.log('fetchProducts saga,', payload)
  try {
      const products = yield handleFetchProducts({ payload });
      yield put(
        setProducts(products)
      )
  } catch (err) {
      //console.log(err)
  }
}

export function* onFetchProductsStart() {
    yield takeLatest(productsTypes.FETCH_PRODUCTS_START, fetchProducts)
}

export function* deleteProduct({ payload }) {
    
    try {
        yield handleDeleteProduct(payload)
        yield put(
          fetchProductsStart()
        )
    } catch (err) {
       // console.log(err)
    }
}

export function* onDeleteProductStart() {
    yield takeLatest(productsTypes.DELETE_PRODUCT_START, deleteProduct)
}

export default function* productsSagas() {
    yield all([
        call(onAddProductStart),
        call(onFetchProductsStart),
        call(onDeleteProductStart)
    ])
}