import React, { useState } from 'react'
import {withRouter} from 'react-router-dom'
import {Link} from 'react-router-dom'
import Button from '../forms/Button/index'
import { signInWithGoogle, auth } from '../../firebase/config'
import FormInput from '../forms/FormInput'
import './styles.scss'
import { toast } from 'react-toastify'
import AuthWrapper from '../../components/AuthWrapper'

const Signin = (props) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const googleSignin = async (e) => {
        e.preventDefault()
        signInWithGoogle()
    }


    const handleSubmit = async e => {
        e.preventDefault()

        try {
            await auth.signInWithEmailAndPassword(email, password)
            setEmail('')
            setPassword('')
            props.history.push('/')
            
        } catch (error) {

            toast.error(error.message)
        }
    }

    return (
        <AuthWrapper headline="Login">
            <div className="formWrap">
                <form onSubmit={e => handleSubmit(e)}>
                    <FormInput
                        onChange={e=>setEmail(e.target.value)}
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Email"
                    />
                    <FormInput
                        onChange={e=>setPassword(e.target.value)}
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
                                onClick={e => googleSignin(e)}
                            >
                                Signin with Google
                                </Button>
                        </div>
                    </div>
                    <div className="links">
                        <Link to='/recovery'>
                            Rest Password
                        </Link>
                    </div>
                </form>
            </div>
        </AuthWrapper>
    )
}

export default withRouter(Signin)
