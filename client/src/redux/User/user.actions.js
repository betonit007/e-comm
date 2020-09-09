import userTypes from './user.types'
import { GoogleProvider, handleUserProfile, auth } from '../../firebase/config'
import { toast } from 'react-toastify'

export const setCurrentUser = user => ({
    type: userTypes.SET_CURRENT_USER,
    payload: user
})

export const signInUser = ({ email, password }) => async dispatch => {
    try {
        await auth.signInWithEmailAndPassword(email, password)
        dispatch({
            type: userTypes.SIGN_IN_SUCCESS,
            payload: true
        })

    } catch (error) {
        toast.error(error.message)
    }
}

export const signUpUser = ({ displayName, email, password, confirmPassword }) => async dispatch => {
    if (password !== confirmPassword) {
        toast.error("Passwords do not match")
        return
    }
    try {
        const { user } = await auth.createUserWithEmailAndPassword(email, password);
        await handleUserProfile(user, { displayName })
        dispatch({
            type: userTypes.SIGN_UP_SUCCESS,
            payload: true
        })
    } catch (error) {
      toast.error(error)
    }
}

export const resetPassword = ({ email }) => async dispatch => {

    try {
        await auth.sendPasswordResetEmail(email, { url: "http://localhost:3000/login" })
        dispatch({
            type: userTypes.RESET_PASSWORD_SUCCESS,
            payload: true
        })

    } catch (error) {
        toast.error(error.message)
    }
} 

export const signInWithGoogle = () => async dispatch => {
    console.log('caleed')
try {
    const res = await auth.signInWithPopup(GoogleProvider)
    console.log('res', res)
    dispatch({
        type: userTypes.SIGN_IN_SUCCESS,
        payload: true
    })

} catch (error) {
    console.log(error)
}}

export const resetAllAuthForms = () => ({
    type: userTypes.RESET_AUTH_FORMS
})