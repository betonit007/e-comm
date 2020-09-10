import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Button from '../forms/Button/index'
import FormInput from '../forms/FormInput'
import './styles.scss'
import AuthWrapper from '../../components/AuthWrapper'
import { emailSignInStart, googleSigninStart } from '../../redux/User/user.actions'

const mapState = ({ user }) => ({
    currentUser: user.currentUser
})

const Signin = () => {
    const history = useHistory()
    const { currentUser } = useSelector(mapState)
    const dispatch = useDispatch();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        if (currentUser) {
            setEmail('')
            setPassword('')
            history.push('/')
        }
    }, [currentUser])


    const handleSubmit = async e => {
        e.preventDefault()
        dispatch(emailSignInStart({ email, password }))
    }

    const handleGoogleSignIn = (e) => {
        e.preventDefault()
        dispatch(googleSigninStart())
    }

    return (
        <AuthWrapper headline="Login">
            <div className="formWrap">
                <form onSubmit={e => handleSubmit(e)}>
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
                    <Button type='submit'>
                        Submit
                        </Button>
                    <div className="socialSignin">
                        <div className="row">
                            <Button
                                style={{ backgroundColor: "#de5246" }}
                                onClick={e=>handleGoogleSignIn(e)}
                            >
                                Signin with Google
                                </Button>
                        </div>
                    </div>
                    <div className="links">
                        <Link to='/recovery'>
                            Reset Password
                        </Link>
                    </div>
                </form>
            </div>
        </AuthWrapper>
    )
}

export default Signin
