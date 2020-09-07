import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import FormInput from '../forms/FormInput'
import Button from '../forms/Button'
import { auth, handleUserProfile } from '../../firebase/config'
import AuthWrapper from '../../components/AuthWrapper'
import './styles.scss'

const Signup = props => {

    const [userInfo, setUserInfo] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleFormSubmit = async e => {
        e.preventDefault()
        console.log('here')
        if (password !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        }

        try {

            const { user } = await auth.createUserWithEmailAndPassword(email, password)

            await handleUserProfile(user, { displayName })

            setDisplayName("")
            setEmail('')
            setPassword('')
            setConfirmPassword("")
            props.history.push('/')

        } catch (err) {
            toast.error(err)
        }
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
