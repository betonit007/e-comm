import React, {useState} from 'react'
import Button from '../forms/Button/index'
import { signInWithGoogle, auth } from '../../firebase/config'
import FormInput from '../forms/FormInput'
import './styles.scss'
import { toast } from 'react-toastify'

const Signin = () => {

    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
    })

    const { email, password } = userInfo

    const googleSignin = async (e) => {
        e.preventDefault()
        signInWithGoogle()
    } 

    const handleChange = e => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        
        try {
            await auth.signInWithEmailAndPassword(email, password)
        } catch (error) {
           
            toast.error(error.message)
        }
    }

    return (
        <div className='sigin'>
            <div className="wrap">
                <h2>
                    Login
                </h2>
                <div className="formWrap">
                    <form onSubmit={e=>handleSubmit(e)}>
                        <FormInput
                          onChange={handleChange}
                          type="email"
                          name="email"
                          value={email}
                          placeholder="Email"
                        />
                        <FormInput
                          onChange={handleChange}
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
                                  style={{backgroundColor: "#de5246"}}
                                  onClick={e=>googleSignin(e)}
                                >
                                    Signin with Google
                                </Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signin