import React, { useState } from 'react'
import { toast } from 'react-toastify'
import FormInput from '../forms/FormInput'
import Button from '../forms/Button'
import { auth, handleUserProfile } from '../../firebase/config'
import './styles.scss'

const Signup = () => {

    const [userInfo, setUserInfo] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const handleChange = e => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }

    const { displayName, email, password, confirmPassword } = userInfo

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
            setUserInfo({
                displayName: '',
                email: '',
                password: '',
                confirmPassword: ''
            })

        } catch (err) {
            toast.error(err)
        }
    }

    return (
        <div className='signup'>
            <div className="wrap">
                <h2>
                    Signup
                </h2>
                <div className="formWrap">
                    <form onSubmit={e => handleFormSubmit(e)}>
                        <FormInput
                            handleChange={e => handleChange(e)}
                            type="text"
                            name="displayName"
                            value={displayName}
                            placeholder="Full Name"
                        />
                        <FormInput
                            handleChange={handleChange}
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Email"
                        />
                        <FormInput
                            handleChange={handleChange}
                            type="password"
                            name="password"
                            value={password}
                            placeholder="Password"
                        />
                        <FormInput
                            handleChange={handleChange}
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
            </div>
        </div>
    )
}

export default Signup
