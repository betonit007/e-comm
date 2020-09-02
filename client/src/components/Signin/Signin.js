import React, {useState} from 'react'
import Button from '../forms/Button/index'
import { signInWithGoogle } from '../../firebase/config'
import './styles.scss'

const Signin = () => {

    const googleSignin = async (e) => {
        e.preventDefault()
        signInWithGoogle()
    } 

    return (
        <div className='sigin'>
            <div className="wrap">
                <h2>
                    Login
                </h2>
                <div className="formWrap">
                    <form >
                        <div className="socialSignin">
                            <div className="row">
                                <Button
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
