import { takeLatest, call, all, put } from 'redux-saga/effects'
import { GoogleProvider, getCurrentUser, handleUserProfile, auth } from '../../firebase/config'
import userTypes from './user.types'
import { signInSuccess, signOutUserSuccess, resetPasswordSuccess} from './user.actions'
import {toast} from 'react-toastify'
import { handleResetPasswordAPI } from './user.helpers'

export function* getSnapShotFromUserAuth(user,  additionalData={}) {
    try {

        const userRef = yield call(handleUserProfile, {userAuth: user, additionalData})
        const snapshot = yield userRef.get()
        yield put(
            signInSuccess({
                id: snapshot.id,
                ...snapshot.data()
            })
        )
    }
    catch (error) {
        console.log(error)
    }
}

export function* emailSignIn({ payload: { email, password } }) {
    try {
        const { user } = yield auth.signInWithEmailAndPassword(email, password)
        yield getSnapShotFromUserAuth(user)

    } catch (error) {
        toast.error(error.message)
        console.log(error.message)
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);

}

export function* isUserAuthenticated() {
  try {
      const userAuth = yield getCurrentUser();
      if (!userAuth) return
      yield getSnapShotFromUserAuth(userAuth)

  } catch (error) {
      console.log(error)
  }
}

export function* onCheckUserSession() {
    yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* signOutUser() {
  try {
      yield auth.signOut();
      yield put(
          signOutUserSuccess()
      )
  } catch (error) {
      //console.log(error)
  }
}

export function* onSignOutUserStart() {
    yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser)
}

export function* signUpUser({ payload: {
    displayName,
    email,
    password,
    confirmPassword
}}) {
    if (password !== confirmPassword) {
        toast.error("Passwords do not match")
        return
    }
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        const additionalData = { displayName }
        yield getSnapShotFromUserAuth(user, additionalData)
        //yield call(handleUserProfile, { userAuth: user, additionalData: { displayName }})
        
    } catch (error) {
      toast.error(error)
    }
}

export function* onSignUpUserStart() {
   yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser)
}

export function* resetPassword({ payload: {email}}) {
    try {
        yield call(handleResetPasswordAPI, email)
        yield put(
            resetPasswordSuccess()
        )
    } catch (err) {
     console.log(err)
    }
}

export function* onResetPasswordStart() {
    yield takeLatest(userTypes.RESET_PASSWORD_START, resetPassword)
}

export function* googleSignin() {
  try {
    const {user} = yield auth.signInWithPopup(GoogleProvider)
    yield getSnapShotFromUserAuth(user)
  } catch (err) {
      
  }
}

export function* onGoogleSigninStart() {
    yield takeLatest(userTypes.GOOGLE_SIGNIN_START, googleSignin)
}

export default function* userSagas() {
    yield all([
        call(onEmailSignInStart), 
        call(onCheckUserSession), 
        call(onSignOutUserStart),
        call(onSignUpUserStart),
        call(onResetPasswordStart),
        call(onGoogleSigninStart),
        call(onGoogleSigninStart),
    ])
}