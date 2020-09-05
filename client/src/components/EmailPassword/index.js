import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import AuthWrapper from '../AuthWrapper'
import FormInput from '../forms/FormInput'
import Button from '../forms/Button'
import {auth} from '../../firebase/config'
import { toast } from 'react-toastify'
import './styles.scss'

const EmailPassword = ({history}) => {

    const [email, setEmail] = useState('')

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await auth.sendPasswordResetEmail(email, {url: "http://localhost:3000/login"})
            history.push('/login')

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    

    return (
        <AuthWrapper headline="Email Password">
            <div className="formWrap">
                <form onSubmit={handleSubmit}>
                  <FormInput
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Email"
                    onChange={e=>setEmail(e.target.value)}
                  />
                  <Button 
                    type="submit">
                      Email Password
                  </Button>
                </form>
            </div>
        </AuthWrapper>
    )
}

export default withRouter(EmailPassword)
