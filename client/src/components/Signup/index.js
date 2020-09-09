import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { signUpUser, resetAllAuthForms } from '../../redux/User/user.actions'
import FormInput from '../forms/FormInput'
import Button from '../forms/Button'
import AuthWrapper from '../../components/AuthWrapper'
import './styles.scss'

const mapState = ({user}) => ({
  signUpSuccess: user.signUpSuccess,
  signUpError: user.signUpError
})

const Signup = props => {
    const dispatch = useDispatch()
    const { signUpError, signUpSuccess} = useSelector(mapState)
    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    
    useEffect(() => {
      if (signUpSuccess) {
        setDisplayName("")
        setEmail('')
        setPassword('')
        setConfirmPassword("")
        dispatch(resetAllAuthForms())
        props.history.push('/')
      }
    }, [signUpSuccess])


    const handleFormSubmit = async e => {
        e.preventDefault()
        dispatch(signUpUser({
            displayName,
            email,
            password,
            confirmPassword
        }))
    }

    return (
        <AuthWrapper headline='Register'>
            <div className="formWrap">
                <form onSubmit={e => handleFormSubmit(e)}>
                    <FormInput
                        onChange={e => setDisplayName(e.target.value)}
                        type="text"
                        name="displayName"
                        value={displayName}
                        placeholder="Full Name"
                    />
                    <FormInput
                        onChange={e => setEmail(e.target.value)}
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                    />
                    <FormInput
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                    />
                    <FormInput
                        onChange={e => setConfirmPassword(e.target.value)}
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        placeholder="Confirm Password"
                    />
                    <Button type='submit'>
                        Register
                        </Button>
                </form>
            </div>
        </AuthWrapper>
    )
}

export default withRouter(Signup)
